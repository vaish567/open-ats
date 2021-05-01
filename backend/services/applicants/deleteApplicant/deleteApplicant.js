"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApplicant = void 0;
var Joi = require("joi");
var idLength = 20;
var deleteApplicant = function (id) {
    if (!id)
        return { message: "ERROR: 'id' not provided - Received: " + id }; // Check for falsy values
    var validation = Joi.string()
        .required()
        .length(idLength)
        .messages({
        "string.base": "'id' is not a string - Received: " + typeof id,
        "string.length": "'id' length is not " + idLength + " - Received length: " + id.length,
    })
        .validate(id);
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
exports.deleteApplicant = deleteApplicant;
