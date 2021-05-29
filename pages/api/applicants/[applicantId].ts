import doesFunnelExist from "../../../utils/doesFunnelExist/doesFunnelExist";
import doesStageExist from "../../../utils/doesStageExist/doesStageExist";
import {
  ID_LENGTH,
  DYNAMO_CONFIG,
  DYNAMO_TABLE_NAME,
} from "../../../config/GeneralConfig";
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(405).json({ message: "Method not allowed" });
  return;
};
