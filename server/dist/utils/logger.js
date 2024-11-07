"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInfo = logInfo;
exports.logError = logError;
exports.logWarn = logWarn;
exports.logDebug = logDebug;
const winston_1 = __importDefault(require("winston"));
// การตั้งค่าโลเกเตอร์
const { combine, timestamp, printf, errors, colorize } = winston_1.default.format;
// ฟอร์แมตการล็อก
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});
// การสร้างโลเกเตอร์
const logger = winston_1.default.createLogger({
    level: "info", // ระดับการล็อก (info, warn, error, debug)
    format: combine(timestamp(), errors({ stack: true }), // จัดการกับข้อผิดพลาดและสแตก
    logFormat),
    transports: [
        new winston_1.default.transports.Console({
            format: combine(colorize(), // เพิ่มสีให้กับข้อความล็อกในคอนโซล
            timestamp(), printf(({ level, message, timestamp, stack }) => {
                return `${timestamp} [${level}]: ${stack || message}`;
            })),
            level: "debug", // แสดงข้อมูลล็อกระดับ debug และสูงกว่าในคอนโซล
        }),
        new winston_1.default.transports.File({ filename: "logs/app.log", level: "info" }), // ล็อกไปยังไฟล์ (บันทึกข้อมูลระดับ info และสูงกว่า)
    ],
});
// ฟังก์ชันสำหรับล็อกข้อมูล
function logInfo(message) {
    logger.info(message);
}
// ฟังก์ชันสำหรับล็อกข้อผิดพลาด
function logError(message, error) {
    logger.error(message, { error });
}
// ฟังก์ชันสำหรับล็อกการเตือน
function logWarn(message) {
    logger.warn(message);
}
// ฟังก์ชันสำหรับล็อกการดีบัก
function logDebug(message) {
    logger.debug(message);
}
exports.default = logger;
