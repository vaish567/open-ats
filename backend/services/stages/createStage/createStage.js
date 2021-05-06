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
var doesFunnelExist_1 = require("../../../utils/doesFunnelExist/doesFunnelExist");
var doesStageExist_1 = require("../../../utils/doesStageExist/doesStageExist");
var Joi = require("joi");
var idLength = 25; // TODO move over to parameter store?
var stageTitleLength = 200;
var descriptionLength = 2000;
var joiConfig = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "''",
        },
    },
};
var dynamodb = new client_dynamodb_1.DynamoDB({ apiVersion: "2012-08-10" });
var StageSchema = Joi.object({
    STAGE_TITLE: Joi.string().required().max(stageTitleLength),
    DESCRIPTION: Joi.string().max(descriptionLength),
    FUNNEL_ID: Joi.string().required().length(idLength),
}).and("STAGE_TITLE", "FUNNEL_ID");
/**
 *
 * @param stage
 * @param STAGE_TITLE The stage title
 * @param DESCRIPTION The description of this stage and what it does
 * @param FUNNEL_ID The funnel ID of that this stage belongs to
 * @returns
 */
var createStage = function (stage) { return __awaiter(void 0, void 0, void 0, function () {
    var validation, responseFunnel, responseStage, params, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                validation = StageSchema.validate(stage, joiConfig);
                if (validation.error)
                    return [2 /*return*/, { message: "ERROR: " + validation.error.message }];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, doesFunnelExist_1.default(stage.FUNNEL_ID)];
            case 2:
                responseFunnel = _a.sent();
                if (!responseFunnel)
                    return [2 /*return*/, {
                            message: "ERROR: Funnel ID " + stage.FUNNEL_ID + " does not exist, please create it first before trying to make a stage inside of it",
                        }];
                return [4 /*yield*/, doesStageExist_1.default(stage.FUNNEL_ID, stage.STAGE_TITLE)];
            case 3:
                responseStage = _a.sent();
                if (responseStage)
                    return [2 /*return*/, {
                            message: "ERROR: Stage " + stage.STAGE_TITLE + " already exists in " + responseFunnel.FUNNEL_TITLE.S + ", please choose another name or update the existing stage",
                        }];
                params = {
                    Item: {
                        PK: { S: "FUNNEL#" + stage.FUNNEL_ID },
                        SK: { S: "STAGE_TITLE#" + stage.STAGE_TITLE },
                        DESCRIPTION: { S: stage.DESCRIPTION },
                        FUNNEL_TITLE: { S: "FUNNEL_TITLE#" + responseFunnel.FUNNEL_TITLE.S },
                        TYPE: { S: "Stage" },
                    },
                    TableName: "OpenATS",
                };
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, dynamodb.putItem(params)];
            case 5:
                _a.sent();
                return [2 /*return*/, {
                        message: "Succesfully created stage " + stage.STAGE_TITLE + " in " + responseFunnel.FUNNEL_TITLE.S,
                    }];
            case 6:
                error_1 = _a.sent();
                console.error("An error occurred creating your stage - " + error_1.message);
                return [2 /*return*/, {
                        message: "ERROR: Unable to create your stage - " + error_1.message,
                    }];
            case 7: return [3 /*break*/, 9];
            case 8:
                error_2 = _a.sent();
                console.error("A message occurred checking if funnel ID " + stage.FUNNEL_ID + " exists, unable to create stage: " + stage.STAGE_TITLE + " - " + error_2.message);
                return [2 /*return*/, {
                        message: "ERROR: Unable to check if funnel ID " + stage.FUNNEL_ID + " exists, was not able to create stage '" + stage.STAGE_TITLE + "' - " + error_2.message,
                    }];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.default = createStage;
