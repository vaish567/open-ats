// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

// const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
// const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb"); // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_util_dynamodb.html
// const nanoid = require("nanoid");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      // Create an applicant
      return res.status(201).json({
        message: "Applicant succesfully created!",
        applicant: req.body.applicant,
      });

    case "GET":
      return res.status(200).json({
        applicants: [
          // Mock data // TODO remove
          {
            name: "Jose Valerio",
            position: "Developer",
          },
          {
            name: "Vaishnav Parte",
            position: "Developer",
          },
        ],
      });

    default:
      return res
        .status(405)
        .json({ message: `Method Not Allowed - ${method}` });
  }
};
