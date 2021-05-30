import * as Config from "../config/GeneralConfig";

describe("Configuraton", () => {
  test("Checks if APPLICANT_ID_LENGTH is greater than or equal to 20", () => {
    expect(Config.APPLICANT_ID_LENGTH).toBeGreaterThanOrEqual(20);
  });

  test("Checks if STAGE_DESCRIPTION_MAX_LENGTH is greater than 0", () => {
    expect(Config.STAGE_DESCRIPTION_MAX_LENGTH).toBeGreaterThanOrEqual(1);
  });

  test("Checks if STAGE_TITLE_MAX_LENGTH is greater than 0", () => {
    expect(Config.STAGE_TITLE_MAX_LENGTH).toBeGreaterThanOrEqual(1);
  });

  test("Checks if DYNAMO_TABLE_NAME is a string", () => {
    expect(typeof Config.DYNAMO_TABLE_NAME).toBe("string");
    expect(Config.DYNAMO_TABLE_NAME.length).toBeGreaterThanOrEqual(1);
  });

  const ValidGlobalTableRegions = [
    // https://aws.amazon.com/about-aws/whats-new/2020/10/amazon-dynamodb-global-tables-are-now-available-in-the-europe-milan-and-europe-stockholm-regions/#:~:text=Oct%206%2C%202020-,Amazon%20DynamoDB%20global%20tables%20are%20now%20available%20in%20the%20Europe,fast%20read%20and%20write%20performance.
    "us-east-1",
    "eu-north-1",
    "sa-east-1",
    "us-gov-west-1",
    "us-gov-east-1",
    "cn-northwest-1",
    "eu-west-3",
    "us-east-2",
    "eu-south-1",
    "eu-west-2",
    "eu-central-1",
    "eu-west-1",
    "us-west-1",
    "us-west-2",
    "ap-south-1",
    "ap-northeast-2",
    "ap-southeast-1",
    "ap-northeast-1",
    "ap-southeast-2",
    "ca-central-1",
    "cn-north-1",
  ];

  test("Checks if DYNAMO_CONFIG.region is set to one where Global Tables is available", () => {
    expect(ValidGlobalTableRegions).toContain(Config.DYNAMO_CONFIG.region);
  });

  test("Checks if FIRST_NAME_MAX_LENGTH is greater than 0", () => {
    expect(Config.FIRST_NAME_MAX_LENGTH).toBeGreaterThanOrEqual(1);
  });

  test("Checks if LAST_NAME_MAX_LENGTH is greater than 0", () => {
    expect(Config.LAST_NAME_MAX_LENGTH).toBeGreaterThanOrEqual(1);
  });
});
