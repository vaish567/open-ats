import doesFunnelExist from "../../../utils/doesFunnelExist/doesFunnelExist";
import doesStageExist from "../../../utils/doesStageExist/doesStageExist";
import { NextApiRequest, NextApiResponse } from "next";
import { ID_LENGTH } from "../../../config/GeneralConfig";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { nanoid } from "nanoid";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const applicant: {
      first_name: string;
      last_name: string;
      email: string;
      funnel_id: string;
      stage_title: string;
      phone_number: string;
    } = req.body;

    try {
      const [funnelExists, stageExists] = await Promise.all([
        doesFunnelExist(applicant.funnel_id),
        doesStageExist(applicant.funnel_id, applicant.stage_title),
      ]);

      if (!funnelExists || !stageExists)
        return res.status(404).json({
          message: `ERROR: The funnel + stage combination in which you are trying to place this applicant in (Funnel ID: '${applicant.funnel_id}' / Stage Title: '${applicant.stage_title}') does not exist`,
        });

      try {
        const applicantId = nanoid(ID_LENGTH);
        const params = {
          Item: {
            PK: { S: `APPLICANT#${applicantId}` },
            SK: { S: `APPLICANT#${applicantId}` },
            TYPE: { S: "Applicant" },
            APPLICANT_ID: { S: applicantId },
            CREATED_AT: { S: new Date().toISOString() },
            CURRENT_FUNNEL_ID: { S: applicant.funnel_id },
            CURRENT_FUNNEL_TITLE: { S: funnelExists.FUNNEL_TITLE.S! },
            // Without exclamation mark, TS will throw an error ^
            // We can guarantee that if a funnel exists, it will have a title
            CURRENT_STAGE_TITLE: { S: `STAGE_TITLE#${applicant.stage_title}` },
            EMAIL: { S: applicant.email },
            FIRST_NAME: { S: applicant.first_name },
            LAST_NAME: { S: applicant.last_name },
            FULL_NAME: { S: `${applicant.first_name} ${applicant.last_name}` },
            PHONE_NUMBER: { S: applicant.phone_number },
          },
          TableName: "OpenATS", // TODO parameter store???
        };
        await DynamoDB.putItem(params);
        return {
          message: "Applicant created succesfully!",
          status: 201,
        };
      } catch (error) {
        console.error(error);
        return {
          message: `ERROR: Unable to create your applicant - ${error.message}`,
          status: 500,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        message: `An error occurred checking if funnel ${applicant.funnel_id} exists`,
        status: 500,
      };
    }
  }

  res.status(405).json({ message: "Method not allowed" }); //Method Not Allowed
  return;
};
