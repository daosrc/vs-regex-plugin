import * as vscode from 'vscode';
import { RegexManager } from './regexManager';
import { RegexValidator } from './regexValidator';

let regexManager: RegexManager;
let regexValidator: RegexValidator;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-regex-plugin" is now active!');

	regexManager = new RegexManager(context);
	regexValidator = new RegexValidator();

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

export function deactivate() {}