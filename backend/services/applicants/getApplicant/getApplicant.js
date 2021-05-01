"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicant = void 0;
var Joi = require("joi");
var idLength = 20;
var getApplicant = function (id) {
    if (!id)
        return { message: "ERROR: 'id' is required" };
    var validation = Joi.string()
        .required()
        .length(idLength)
        .validate(id, {
        abortEarly: false,
        errors: {
            wrap: {
                label: "''",
            },
        },
    });
    if (validation.error) {
        return {
            message: "ERROR: " + validation.error.message,
        };
    }
    return {
        message: "Applicant retrieved succesfully!",
        applicant: {
            email: "cowabunga@nickatnite.com",
            first_name: "James",
            last_name: "Jameson",
            id: id,
            phone_number: "8391823452",
            funnel: "Software Engineer",
            stage: "Document Upload",
            location: "Remote",
            created_at: new Date().toISOString(),
        },
    };
};
exports.getApplicant = getApplicant;
