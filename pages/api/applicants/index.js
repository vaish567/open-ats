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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var doesFunnelExist_1 = __importDefault(require("../../../utils/doesFunnelExist/doesFunnelExist"));
var doesStageExist_1 = __importDefault(require("../../../utils/doesStageExist/doesStageExist"));
var GeneralConfig_1 = require("../../../config/GeneralConfig");
var _a = require("@aws-sdk/client-dynamodb"), DynamoDBClient = _a.DynamoDBClient, PutItemCommand = _a.PutItemCommand;
var _b = require("@aws-sdk/util-dynamodb"), marshall = _b.marshall, unmarshall = _b.unmarshall; // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_util_dynamodb.html
var client = new DynamoDBClient(GeneralConfig_1.DYNAMO_CONFIG);
var nanoid = require("nanoid");
exports.default = (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var method, _a, applicant, _b, funnelExists, stageExists, applicantId, params, command, response, error_1, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                method = req.method;
                _a = method;
                switch (_a) {
                    case "GET": return [3 /*break*/, 1];
                    case "POST": return [3 /*break*/, 2];
                }
                return [3 /*break*/, 11];
            case 1: 
            // Get all applicants
            return [3 /*break*/, 12];
            case 2:
                applicant = req.body;
                _c.label = 3;
            case 3:
                _c.trys.push([3, 9, , 10]);
                return [4 /*yield*/, Promise.all([
                        doesFunnelExist_1.default(applicant.funnel_id),
                        doesStageExist_1.default(applicant.funnel_id, applicant.stage_title),
                    ])];
            case 4:
                _b = _c.sent(), funnelExists = _b[0], stageExists = _b[1];
                if (!funnelExists || !stageExists)
                    return [2 /*return*/, res.status(404).json({
                            message: "ERROR: The funnel + stage combination in which you are trying to place this applicant in (Funnel ID: '" + applicant.funnel_id + "' / Stage Title: '" + applicant.stage_title + "') does not exist",
                        })];
                _c.label = 5;
            case 5:
                _c.trys.push([5, 7, , 8]);
                applicantId = nanoid(GeneralConfig_1.ID_LENGTH);
                params = {
                    Item: marshall({
                        PK: "APPLICANT#" + applicantId,
                        SK: "APPLICANT#" + applicantId,
                        TYPE: "Applicant",
                        APPLICANT_ID: applicantId,
                        CREATED_AT: new Date().toISOString(),
                        CURRENT_FUNNEL_ID: applicant.funnel_id,
                        CURRENT_FUNNEL_TITLE: funnelExists.FUNNEL_TITLE.S,
                        // Without exclamation mark, TS will throw an error ^
                        // We can guarantee that if a funnel exists, it will have a title
                        CURRENT_STAGE_TITLE: "STAGE_TITLE#" + applicant.stage_title,
                        EMAIL: applicant.email,
                        FIRST_NAME: applicant.first_name,
                        LAST_NAME: applicant.last_name,
                        FULL_NAME: applicant.first_name + " " + applicant.last_name,
                        PHONE_NUMBER: applicant.phone_number,
                    }),
                    TableName: GeneralConfig_1.DYNAMO_TABLE_NAME,
                    ReturnValues: "ALL_NEW",
                };
                command = new PutItemCommand(params);
                return [4 /*yield*/, client.send(command)];
            case 6:
                response = _c.sent();
                return [2 /*return*/, res
                        .status(201)
                        .json({ message: "Applicant created succesfully!" })]; // TODO return applicant here
            case 7:
                error_1 = _c.sent();
                console.error(error_1);
                res.status(error_1.status).json({
                    message: "ERROR: Unable to create your applicant - " + error_1.message,
                });
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_2 = _c.sent();
                console.error(error_2);
                res.status(error_2.status).json({
                    message: "An error occurred checking if funnel " + applicant.funnel_id + " exists",
                });
                return [3 /*break*/, 10];
            case 10: return [3 /*break*/, 12];
            case 11:
                res.status(405).json({ message: "Method Not Allowed - " + method });
                _c.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); });
