"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
// https://stackoverflow.com/questions/52085454/typescript-define-a-union-type-from-an-array-of-strings
// I want intellisense / TS to show up when hovering on the function
// Setting these on the config file doesn't work, unless I'm just an idiot
// Either way, everything is validated with Joi, but for dev experience I want the "on-hover" effect
// TODO if you can find a better way to do this please submit a PR :[
var ValidObjectTypes = ["Applicant", "Stage", "Funnel", "Question"];
var ValidPayTypes = [
    "Salary",
    "Hourly",
    "Commission",
    "Dynamic (Per Delivery, Per Task, etc.)",
];
var Config = {
    ID_GENERATION_LENGTH: 25,
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
exports.default = Config;
