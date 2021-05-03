"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var dynamodb = new client_dynamodb_1.DynamoDB({ apiVersion: "2012-08-10" });
var nanoid_1 = require("nanoid");
var Joi = require("joi");
var idLength = 25;
var descriptionMaxLength = 2000;
var salaryTypes = ["Salary", "Hourly", "Dynamic"]; // TODO change to 'Pay' types once Dynamo schema has been changed
var JoiConfig = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "''",
        },
    },
};
var createFunnel = function (funnel) { return __awaiter(void 0, void 0, void 0, function () {
    var FunnelSchema, validation, newFunnelId, params, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                FunnelSchema = Joi.object({
                    title: Joi.string().required(),
                    locations: Joi.array().items(Joi.string()).required(),
                    description: Joi.string().max(descriptionMaxLength).required(),
                    pay: Joi.object({
                        // TODO
                        isFixed: Joi.bool().required(),
                        type: Joi.valid.apply(Joi, salaryTypes).required(),
                        lowEnd: Joi.string().required(),
                        fixed: Joi.string().required(),
                        highEnd: Joi.string().required(),
                        currency: Joi.string().length(3).required(), // TODO
                    }),
                });
                validation = FunnelSchema.validate(funnel, JoiConfig);
                if (validation.error) {
                    return [2 /*return*/, {
                            message: "ERROR: " + validation.error.message,
                        }];
                }
                newFunnelId = nanoid_1.nanoid(idLength);
                params = {
                    Item: {
                        PK: { S: newFunnelId },
                        SK: { S: newFunnelId },
                        TYPE: { S: "Funnel" },
                        LOCATIONS: { SS: funnel.locations },
                        PAY_RANGE: {
                            M: {
                                isFixed: { BOOL: false },
                                type: { S: funnel.pay.type },
                                lowEnd: { S: funnel.pay.lowEnd },
                                highEnd: { S: funnel.pay.highEnd },
                                fixed: { S: funnel.pay.fixed },
                                currency: { S: funnel.pay.currency }, // TODO destructure this
                            },
                        },
                        DESCRIPTION: { S: funnel.description },
                        FUNNEL_ID: { S: newFunnelId },
                        FUNNEL_TITLE: { S: funnel.title },
                    },
                    TableName: "OpenATS", // TODO move to parameter store?
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, dynamodb.putItem(params)];
            case 2:
                _a.sent();
                return [2 /*return*/, { message: "Funnel  " + funnel.title + " created!" }];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, {
                        message: "An error occurred creating your funnel " + error_1.message,
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = createFunnel;
