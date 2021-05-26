"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var doesFunnelExist_1 = __importDefault(require("../../../utils/doesFunnelExist/doesFunnelExist"));
var doesStageExist_1 = __importDefault(require("../../../utils/doesStageExist/doesStageExist"));
var GeneralConfig_js_1 = __importDefault(require("../../../../config/GeneralConfig.js"));
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var Joi = __importStar(require("joi"));
var STAGE_DESCRIPTION_LENGTH = GeneralConfig_js_1.default.STAGE_DESCRIPTION_MAX_LENGTH;
var STAGE_TITLE_LENGTH = GeneralConfig_js_1.default.STAGE_TITLE_MAX_LENGTH;
var idLength = GeneralConfig_js_1.default.ID_GENERATION_LENGTH;
var dynamodb = new client_dynamodb_1.DynamoDB(GeneralConfig_js_1.default.DYNAMO_CONFIG);
var joiConfig = GeneralConfig_js_1.default.JOI_CONFIG;
var StageSchema = Joi.object({
    STAGE_TITLE: Joi.string().required().max(STAGE_TITLE_LENGTH),
    DESCRIPTION: Joi.string().max(STAGE_DESCRIPTION_LENGTH),
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
    var validation, responseFunnel, responseStage, params, error_1, error_2, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                validation = StageSchema.validate(stage, joiConfig);
                if (validation.error)
                    return [2 /*return*/, { message: "ERROR: " + validation.error.message, status: 400 }];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 11, , 12]);
                return [4 /*yield*/, doesFunnelExist_1.default(stage.FUNNEL_ID)];
            case 2:
                responseFunnel = _a.sent();
                if (!responseFunnel)
                    return [2 /*return*/, {
                            message: "ERROR: Funnel ID " + stage.FUNNEL_ID + " does not exist, please create it first before trying to make a stage inside of it",
                            status: 404,
                        }];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 9, , 10]);
                return [4 /*yield*/, doesStageExist_1.default(stage.FUNNEL_ID, stage.STAGE_TITLE)];
            case 4:
                responseStage = _a.sent();
                if (responseStage)
                    return [2 /*return*/, {
                            message: "ERROR: Stage " + stage.STAGE_TITLE + " already exists in " + responseFunnel.FUNNEL_TITLE.S + ", please choose another name or update the existing stage",
                            status: 409,
                        }];
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                params = {
                    Item: {
                        PK: { S: "FUNNEL#" + stage.FUNNEL_ID },
                        SK: { S: "STAGE_TITLE#" + stage.STAGE_TITLE },
                        DESCRIPTION: { S: stage.DESCRIPTION },
                        FUNNEL_TITLE: {
                            S: "FUNNEL_TITLE#" + responseFunnel.FUNNEL_TITLE.S,
                        },
                        TYPE: { S: "Stage" },
                    },
                    TableName: "OpenATS",
                };
                return [4 /*yield*/, dynamodb.putItem(params)];
            case 6:
                _a.sent();
                return [2 /*return*/, {
                        message: "Succesfully created stage " + stage.STAGE_TITLE + " in " + responseFunnel.FUNNEL_TITLE.S,
                        status: 201,
                    }];
            case 7:
                error_1 = _a.sent();
                console.error("An error occurred creating your stage - " + error_1.message);
                return [2 /*return*/, {
                        message: "ERROR: Unable to create your stage - " + error_1.message,
                        status: 500,
                    }];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_2 = _a.sent();
                console.error(error_2);
                return [2 /*return*/, {
                        message: "ERROR: Unable to check if stage already exists " + error_2.message,
                        status: 500,
                    }];
            case 10: return [3 /*break*/, 12];
            case 11:
                error_3 = _a.sent();
                console.error("A message occurred checking if funnel ID " + stage.FUNNEL_ID + " exists, unable to create stage: " + stage.STAGE_TITLE + " - " + error_3.message);
                return [2 /*return*/, {
                        message: "ERROR: Unable to check if funnel ID " + stage.FUNNEL_ID + " exists, was not able to create stage '" + stage.STAGE_TITLE + "' - " + error_3.message,
                        status: 500,
                    }];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.default = createStage;
