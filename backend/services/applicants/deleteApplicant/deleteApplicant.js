"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var idLength = 20;
var deleteApplicant = function (id) {
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
        message: "Applicant deleted succesfully!",
        id: id,
    };
};
exports.default = deleteApplicant;
