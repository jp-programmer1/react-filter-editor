"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const react_1 = __importDefault(require("react"));
const Button = ({ title, onClick }) => {
    const styles = {
        padding: "0.5rem",
        textAlign: "center",
        backgroundColor: "#71C314",
        color: "white"
    };
    return (react_1.default.createElement("div", { style: styles, onClick: onClick }, title));
};
exports.Button = Button;
