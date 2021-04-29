"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicant = void 0;
var joi_1 = __importDefault(require("joi"));
var ApplicantSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.base": "email is not a string",
        "string.email": "email is not an actual email",
        "string.empty": "email cannot be blank",
        "any.required": "email is required",
    }),
    first_name: joi_1.default.string().required().max(50).messages({
        "string.base": "first_name must be a string",
        "string.empty": "first_name cannot be empty",
        "string.max": "first_name cannot be larger than 50 characters",
        "any.required": "first_name is required",
    }),
    last_name: joi_1.default.string().required().max(50).messages({
        "string.base": "last_name must be a string",
        "string.empty": "last_name cannot be empty",
        "string.max": "last_name cannot be larger than 50 characters",
        "any.required": "last_name is required",
    }),
    phone_number: joi_1.default.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
        "string.base": "phone_number must be a string",
        "string.empty": "phone_number cannot be empty",
        "string.length": "phone_number must be 10 digits",
        "any.required": "phone_number is required",
    }),
});
var createApplicant = function (applicant) {
    var _a;
    var validation = ApplicantSchema.validate(applicant);
    if (validation.error) {
        return { message: (_a = validation.error) === null || _a === void 0 ? void 0 : _a.message };
    }
    var email = applicant.email, first_name = applicant.first_name, last_name = applicant.last_name, phone_number = applicant.phone_number;
    return {
        message: "Applicant created succesfully!",
        applicant: {
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            created_at: Math.floor(Date.now() / 1000),
        },
    };
};
exports.createApplicant = createApplicant;
