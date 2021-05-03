/**
 * Note: Depending on your applicant pool, this might be an 'expensive' call to make.
 * For the sake of argument, let's say each applicant is 5kb in size.
 * Dynamo charges $.25 for every million calls.
 * Querying returns a max of 1mb per call.
 * 4,000,000 applicants * 5kb each = 20,000 mb.
 * This means, at *minimum*, you will need to make 20,000 calls to Dynamo.
 * Dynamo price per call = $0.00000025
 * Querying 4 million applicants = $0.00000025 * 20,000 = $0.005
 * Soooooo... do with that what you will. Use with caution.
 * TODO will Lambda's timeout even let you do that many queries? lol
 */
//
// F
// At 4kb per applicant & 4 million applicants
// DynamoDB $0.25 per million reads
// Query returns 1mb / 4kb = 250 applicants per call
// 4 million / 250 applicants per call = 16,000 calls to get all
// Cost per call to get all applicants = $0.002 I think, too tired to do the math
import { AttributeValue, DynamoDB } from "@aws-sdk/client-dynamodb";
import * as Joi from "joi";
const dynamodb = new DynamoDB({ apiVersion: "2012-08-10" });
const validSearches: string[] = ["Applicant", "Stage", "Funnel", "Question"];
const getAllByType = async (
  searchTerm: "Applicant" | "Stage" | "Funnel" | "Question"
) => {
  const validation = Joi.string()
    .required()
    .valid(...validSearches)
    .validate(searchTerm, {
      abortEarly: false,
      errors: {
        wrap: {
          label: "''",
        },
      },
    });

  if (validation.error) {
    return {
      message: `ERROR: ${validation.error.message}`,
    };
  }
  interface DBParams {
    TableName: string;
    IndexName: string;
    KeyConditionExpression: string;
    ExpressionAttributeNames?: {};
    ExpressionAttributeValues?: {};
    ExclusiveStartKey?: { [key: string]: AttributeValue } | undefined;
  }
  let params: DBParams = {
    TableName: "OpenATS",
    IndexName: "AllByType",
    KeyConditionExpression: "#type = :v_type",
    ExpressionAttributeNames: {
      "#type": "TYPE",
    },
    ExpressionAttributeValues: {
      ":v_type": { S: searchTerm },
    },
    ExclusiveStartKey: undefined,
  };
  try {
    let results: any[] = [];
    let data = await dynamodb.query(params);
    do {
      if (!data.Items) return { message: `${searchTerm} not found` };
      data.Items.forEach((item) => results.push(item));
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      // Keep querying to get ALL results
    } while (typeof data.LastEvaluatedKey !== "undefined");
    return results;
  } catch (error) {
    console.error(`Error getting ${searchTerm}`, error);
    return { message: `ERROR: ${error.message}` };
  }
};
export default getAllByType;
