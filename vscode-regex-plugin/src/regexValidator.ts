import * as vscode from 'vscode';
import { RegexRule, ValidationResult } from './types';

export class RegexValidator {
    /**
     * 验证正则表达式的有效性
     */
    public async validateRegex(): Promise<void> {
        const input = await vscode.window.showInputBox({
            prompt: '请输入要验证的正则表达式',
            placeHolder: '例如: ^[a-zA-Z0-9]+$'
        });

        if (input) {
            const result = this.validateRegexPattern(input);
            if (result.isValid) {
                vscode.window.showInformationMessage(`正则表达式有效: ${input}`);
            } else {
                vscode.window.showErrorMessage(`正则表达式无效: ${result.errorMessage}`);
            }
        }
    }

    /**
     * 测试正则表达式的匹配功能
     */
    public async testRegex(): Promise<void> {
        // 获取正则表达式
        const pattern = await vscode.window.showInputBox({
            prompt: '请输入正则表达式',
            placeHolder: '例如: ^[a-zA-Z0-9]+$'
        });

        if (!pattern) {
            return;
        }

        // 验证正则表达式
        const validationResult = this.validateRegexPattern(pattern);
        if (!validationResult.isValid) {
            vscode.window.showErrorMessage(`正则表达式无效: ${validationResult.errorMessage}`);
            return;
        }

        // 获取测试文本
        const testText = await vscode.window.showInputBox({
            prompt: '请输入要测试的文本',
            placeHolder: '例如: abc123'
        });

        if (testText === undefined) {
            return;
        }

        try {
            const regex = new RegExp(pattern);
            const matches = testText.match(regex);

            if (matches) {
                vscode.window.showInformationMessage(
                    `匹配成功! 匹配结果: ${JSON.stringify(matches)}`,
                    '详细信息'
                ).then(selection => {
                    if (selection === '详细信息') {
                        vscode.window.showInformationMessage(
                            `完整匹配: ${matches[0]}\n` +
                            `捕获组数量: ${matches.length - 1}\n` +
                            `输入文本: "${testText}"\n` +
                            `正则表达式: /${pattern}/`
                        );
                    }
                });
            } else {
                vscode.window.showWarningMessage(
                    `匹配失败。输入文本: "${testText}", 正则表达式: /${pattern}/`
                );
            }
        } catch (error) {
            vscode.window.showErrorMessage(`测试过程中发生错误: ${error}`);
        }
    }

    /**
     * 验证正则表达式模式是否有效
     * @param pattern 正则表达式模式
     * @returns 验证结果
     */
    public validateRegexPattern(pattern: string): ValidationResult {
        try {
            new RegExp(pattern);
            return { isValid: true };
        } catch (error) {
            return {
                isValid: false,
                errorMessage: error instanceof Error ? error.message : String(error)
            };
        }
    }

    /**
     * 根据规则测试正则表达式
     * @param rule 正则规则
     * @param testString 测试字符串
     * @returns 匹配结果
     */
    public testRegexRule(rule: RegexRule, testString: string): ValidationResult {
        try {
            const regex = new RegExp(rule.pattern, rule.flags);
            const matches = testString.match(regex);

            return {
                isValid: true,
                matches: matches
            };
        } catch (error) {
            return {
                isValid: false,
                errorMessage: error instanceof Error ? error.message : String(error)
            };
        }
    }
}