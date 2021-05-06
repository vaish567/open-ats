"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var Config = {
    ID_GENERATION_LENGTH: 25,
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
exports.default = Config;
