import { DynamoDB } from "@aws-sdk/client-dynamodb";
import * as Joi from "joi";
import { nanoid } from "nanoid";
const idLength = 25;

const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });

interface Stage {
  STAGE_ID: string;
  PK: string;
  SK: string;
  TYPE: string;
  FUNNEL_ID: string; // Funnel ID of where this stage belongs
}

const createStage = async () => {};

export default createStage;
