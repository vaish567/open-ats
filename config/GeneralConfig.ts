// https://stackoverflow.com/questions/52085454/typescript-define-a-union-type-from-an-array-of-strings
// I want intellisense / TS to show up when hovering on the function
// Setting these on the config file doesn't work, unless I'm just an idiot
// Either way, everything is validated with Joi, but for dev experience I want the "on-hover" effect
// TODO if you can find a better way to do this please submit a PR :[
const ValidObjectTypes = ["Applicant", "Stage", "Funnel", "Question"] as const;
export type ValidTSObjectTypes = typeof ValidObjectTypes[number];

const ValidPayTypes = [
  "Salary",
  "Hourly",
  "Commission",
  "Dynamic (Per Delivery, Per Task, etc.)",
] as const;
export type ValidTSPayTypes = typeof ValidPayTypes[number];

const Config: {
  ID_GENERATION_LENGTH: number;
  FUNNEL_TITLE_MAX_LENGTH: number;
  FUNNEL_DESCRIPTION_MAX_LENGTH: number;
  STAGE_TITLE_MAX_LENGTH: number;
  STAGE_DESCRIPTION_MAX_LENGTH: number;
  FIRST_NAME_MAX_LENGTH: number;
  LAST_NAME_MAX_LENGTH: number;
  VALID_OBJECT_TYPES: readonly string[]; // Applicant, funnel, etc
  VALID_PAY_TYPES: readonly string[]; // Salary, hourly, etc
  DYNAMO_CONFIG: { apiVersion: string };
  JOI_CONFIG: {
    abortEarly: boolean;
    errors: {
      wrap: {
        label: string;
      };
    };
  };
} = {
  ID_GENERATION_LENGTH: 25, // Length of ID's to be generated https://zelark.github.io/nano-id-cc/
  FUNNEL_TITLE_MAX_LENGTH: 100,
  FUNNEL_DESCRIPTION_MAX_LENGTH: 2000,
  STAGE_TITLE_MAX_LENGTH: 100,
  STAGE_DESCRIPTION_MAX_LENGTH: 2000,
  FIRST_NAME_MAX_LENGTH: 50,
  LAST_NAME_MAX_LENGTH: 50,
  DYNAMO_CONFIG: { apiVersion: "2012-08-10" },
  VALID_OBJECT_TYPES: ValidObjectTypes,
  VALID_PAY_TYPES: ValidPayTypes,
  JOI_CONFIG: {
    abortEarly: false,
    errors: {
      wrap: {
        label: "''",
      },
    },
  },
};

export { Config as default };
