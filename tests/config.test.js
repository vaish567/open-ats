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
Object.defineProperty(exports, "__esModule", { value: true });
var Config = __importStar(require("../config/GeneralConfig"));
describe("Configuraton", function () {
    test("Checks if ID_LENGTH is greater than or equal to 20", function () {
        expect(Config.ID_LENGTH).toBeGreaterThanOrEqual(20);
    });
    test("Checks if STAGE_DESCRIPTION_MAX_LENGTH is greater than 0", function () {
        expect(Config.STAGE_DESCRIPTION_MAX_LENGTH).toBeGreaterThanOrEqual(1);
    });
    test("Checks if STAGE_TITLE_MAX_LENGTH is greater than 0", function () {
        expect(Config.STAGE_TITLE_MAX_LENGTH).toBeGreaterThanOrEqual(1);
    });
    test("Checks if DYNAMO_TABLE_NAME is a string", function () {
        expect(typeof Config.DYNAMO_TABLE_NAME).toBe("string");
        expect(Config.DYNAMO_TABLE_NAME.length).toBeGreaterThanOrEqual(1);
    });
    var ValidGlobalTableRegions = [
        // https://aws.amazon.com/about-aws/whats-new/2020/10/amazon-dynamodb-global-tables-are-now-available-in-the-europe-milan-and-europe-stockholm-regions/#:~:text=Oct%206%2C%202020-,Amazon%20DynamoDB%20global%20tables%20are%20now%20available%20in%20the%20Europe,fast%20read%20and%20write%20performance.
        "us-east-1",
        "eu-north-1",
        "sa-east-1",
        "us-gov-west-1",
        "us-gov-east-1",
        "cn-northwest-1",
        "eu-west-3",
        "us-east-2",
        "eu-south-1",
        "eu-west-2",
        "eu-central-1",
        "eu-west-1",
        "us-west-1",
        "us-west-2",
        "ap-south-1",
        "ap-northeast-2",
        "ap-southeast-1",
        "ap-northeast-1",
        "ap-southeast-2",
        "ca-central-1",
        "cn-north-1",
    ];
    test("Checks if DYNAMO_CONFIG.region is set to one where Global Tables is available", function () {
        expect(ValidGlobalTableRegions).toContain(Config.DYNAMO_CONFIG.region);
    });
    test("Checks if FIRST_NAME_MAX_LENGTH is greater than 0", function () {
        expect(Config.FIRST_NAME_MAX_LENGTH).toBeGreaterThanOrEqual(1);
    });
    test("Checks if LAST_NAME_MAX_LENGTH is greater than 0", function () {
        expect(Config.LAST_NAME_MAX_LENGTH).toBeGreaterThanOrEqual(1);
    });
});
