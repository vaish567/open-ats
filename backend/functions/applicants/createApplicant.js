"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicant = void 0;
var joi_1 = __importDefault(require("joi"));
var ApplicantSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    phone_number: joi_1.default.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
});
var createApplicant = function (applicant) {
    var validation = ApplicantSchema.validate(applicant);
    var email = applicant.email, first_name = applicant.first_name, last_name = applicant.last_name, phone_number = applicant.phone_number;
    return validation;
};
exports.createApplicant = createApplicant;
