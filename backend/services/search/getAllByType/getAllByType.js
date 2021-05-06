"use strict";
/**
 * Note: Depending on your applicant pool, this might be an 'expensive' call to make.
 * For the sake of argument, let's say each applicant is 5kb in size.
 * Dynamo charges $.25 for every million calls.
 * Querying returns a max of 1mb per call.
 * 4,000,000 applicants * 5kb each = 20,000mb.
 * This means, at *minimum*, you will need to make 20,000 calls to Dynamo.
 * Dynamo price per call = $0.00000025
 * Querying 4 million applicants = $0.00000025 * 20,000 = $0.005
 * Soooooo... do with that what you will. Use with caution.
 * TODO will Lambda's timeout even let you do that many queries? lol
 */
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
var GeneralConfig_js_1 = require("../../../../config/GeneralConfig.js");
var Joi = require("joi");
var dynamodb = new client_dynamodb_1.DynamoDB(GeneralConfig_js_1.default.DYNAMO_CONFIG);
var validTypes = GeneralConfig_js_1.default.VALID_TYPES;
var joiConfig = GeneralConfig_js_1.default.JOI_CONFIG;
var getAllByType = function (searchTerm) { return __awaiter(void 0, void 0, void 0, function () {
    var validation, params, results_1, data, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                validation = (_a = Joi.string()
                    .required())
                    .valid.apply(_a, validTypes).validate(searchTerm, joiConfig);
                if (validation.error) {
                    return [2 /*return*/, {
                            message: "ERROR: " + validation.error.message,
                        }];
                }
                params = {
                    TableName: "OpenATS",
                    IndexName: "AllByType",
                    KeyConditionExpression: "#type = :v_type",
                    ExpressionAttributeNames: {
                        "#type": "TYPE",
                    },
                    ExpressionAttributeValues: {
                        ":v_type": { S: searchTerm },
                    },
                    ExclusiveStartKey: undefined,
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                results_1 = [];
                return [4 /*yield*/, dynamodb.query(params)];
            case 2:
                data = _b.sent();
                do {
                    if (!data.Items)
                        return [2 /*return*/, { message: searchTerm + " not found" }];
                    data.Items.forEach(function (item) { return results_1.push(item); });
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    // Keep querying to get ALL results
                } while (typeof data.LastEvaluatedKey !== "undefined");
                return [2 /*return*/, results_1];
            case 3:
                error_1 = _b.sent();
                console.error("Error getting " + searchTerm, error_1);
                return [2 /*return*/, { message: "ERROR: " + error_1.message }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = getAllByType;
