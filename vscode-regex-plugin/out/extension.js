"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const regexManager_1 = require("./regexManager");
const regexValidator_1 = require("./regexValidator");
let regexManager;
let regexValidator;
function activate(context) {
    console.log('Congratulations, your extension "vscode-regex-plugin" is now active!');
    regexManager = new regexManager_1.RegexManager(context);
    regexValidator = new regexValidator_1.RegexValidator();
    // 注册命令：显示预置正则列表
    let disposableShowRegexList = vscode.commands.registerCommand('vscode-regex-plugin.showRegexList', () => {
        regexManager.showRegexList();
    });
    // 注册命令：验证正则表达式
    let disposableValidateRegex = vscode.commands.registerCommand('vscode-regex-plugin.validateRegex', () => {
        regexValidator.validateRegex();
    });
    // 注册命令：测试正则表达式
    let disposableTestRegex = vscode.commands.registerCommand('vscode-regex-plugin.testRegex', () => {
        regexValidator.testRegex();
    });
    context.subscriptions.push(disposableShowRegexList);
    context.subscriptions.push(disposableValidateRegex);
    context.subscriptions.push(disposableTestRegex);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map