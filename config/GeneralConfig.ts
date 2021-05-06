const Config: {
  ID_GENERATION_LENGTH: number;
  FUNNEL_TITLE_MAX_LENGTH: number;
  FUNNEL_DESCRIPTION_MAX_LENGTH: number;
  STAGE_TITLE_MAX_LENGTH: number;
  STAGE_DESCRIPTION_MAX_LENGTH: number;
  FIRST_NAME_MAX_LENGTH: number;
  LAST_NAME_MAX_LENGTH: number;
  DYNAMO_CONFIG: { apiVersion: string };
  VALID_TYPES: string[];
  PAY_TYPES: string[];
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
  PAY_TYPES: [
    "Salary",
    "Hourly",
    "Commission",
    "Dynamic (Per Delivery, Per Task, etc.)",
  ],
  VALID_TYPES: ["Applicant", "Stage", "Funnel", "Question"],
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
