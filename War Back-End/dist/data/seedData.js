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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Organization_1 = __importDefault(require("../models/Organization"));
const Missile_1 = __importDefault(require("../models/Missile"));
const organizations_json_1 = __importDefault(require("./organizations.json"));
const missiles_json_1 = __importDefault(require("./missiles.json"));
const database_1 = __importDefault(require("../config/database"));
dotenv_1.default.config();
(0, database_1.default)();
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Organization_1.default.deleteMany();
        yield Missile_1.default.deleteMany();
        yield Organization_1.default.insertMany(organizations_json_1.default);
        yield Missile_1.default.insertMany(missiles_json_1.default);
        console.log("Data Imported!");
        process.exit();
    }
    catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
});
importData();
