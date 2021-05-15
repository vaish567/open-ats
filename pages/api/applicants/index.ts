// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import doesFunnelExist from "../../../utils/doesFunnelExist/doesFunnelExist";
import doesStageExist from "../../../utils/doesStageExist/doesStageExist";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { nanoid } from "nanoid";
const idLength = 25;
export default (req: Request, res: Response) => {
  if (req.method == "POST") {
    const applicant = req.body.applicant;

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
        const applicantId = nanoid(idLength);
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
        await dynamodb.putItem(params);
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
