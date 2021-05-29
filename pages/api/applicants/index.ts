// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import doesFunnelExist from "../../../utils/doesFunnelExist/doesFunnelExist";
import doesStageExist from "../../../utils/doesStageExist/doesStageExist";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ID_LENGTH,
  DYNAMO_CONFIG,
  DYNAMO_TABLE_NAME,
} from "../../../config/GeneralConfig";

const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb"); // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_util_dynamodb.html
const client = new DynamoDBClient(DYNAMO_CONFIG);
const nanoid = require("nanoid");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      // Get all applicants
      break;

    case "POST":
      // Create an applicant
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
            Item: marshall({
              PK: `APPLICANT#${applicantId}`,
              SK: `APPLICANT#${applicantId}`,
              TYPE: "Applicant",
              APPLICANT_ID: applicantId,
              CREATED_AT: new Date().toISOString(),
              CURRENT_FUNNEL_ID: applicant.funnel_id,
              CURRENT_FUNNEL_TITLE: funnelExists.FUNNEL_TITLE.S!,
              // Without exclamation mark, TS will throw an error ^
              // We can guarantee that if a funnel exists, it will have a title
              CURRENT_STAGE_TITLE: `STAGE_TITLE#${applicant.stage_title}`,
              EMAIL: applicant.email,
              FIRST_NAME: applicant.first_name,
              LAST_NAME: applicant.last_name,
              FULL_NAME: `${applicant.first_name} ${applicant.last_name}`,
              PHONE_NUMBER: applicant.phone_number,
            }),
            TableName: DYNAMO_TABLE_NAME,
            ReturnValues: "ALL_NEW",
          };

          // Add applicant
          const command = new PutItemCommand(params);
          const response = await client.send(command);
          return res
            .status(201)
            .json({ message: `Applicant created succesfully!` }); // TODO return applicant here
        } catch (error) {
          console.error(error);
          res.status(error.status).json({
            message: `ERROR: Unable to create your applicant - ${error.message}`,
          });
        }
      } catch (error) {
        console.error(error);
        res.status(error.status).json({
          message: `An error occurred checking if funnel ${applicant.funnel_id} exists`,
        });
      }

      break;

    default:
      res.status(405).json({ message: `Method Not Allowed - ${method}` });
  }
};
