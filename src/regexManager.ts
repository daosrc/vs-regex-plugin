import * as vscode from 'vscode';
import { RegexRule } from './types';

export class RegexManager {
    private context: vscode.ExtensionContext;
    private predefinedRules: RegexRule[] = [
        {
            id: 'email',
            name: '邮箱地址',
            description: '匹配常见的邮箱地址格式',
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
            testCases: ['test@example.com', 'user.name@domain.co.uk']
        },
        {
            id: 'phone-china',
            name: '中国手机号码',
            description: '匹配中国大陆的11位手机号码',
            pattern: '^1[3-9]\\d{9}$',
            testCases: ['13812345678', '15912345678']
        },
        {
            id: 'url',
            name: 'URL链接',
            description: '匹配常见的URL链接格式',
            pattern: '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$',
            testCases: ['https://www.example.com', 'http://example.com/path']
        },
        {
            id: 'id-card-china',
            name: '中国身份证号码',
            description: '匹配中国18位身份证号码',
            pattern: '^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$',
            testCases: ['110101199001011234', '123456199001012345']
        },
        {
            id: 'ip-address',
            name: 'IP地址',
            description: '匹配IPv4地址',
            pattern: '^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$',
            testCases: ['192.168.1.1', '10.0.0.1']
        }
    ];

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    /**
     * 显示预设正则表达式列表
     */
    public async showRegexList(): Promise<void> {
        const items: vscode.QuickPickItem[] = this.predefinedRules.map(rule => ({
            label: rule.name,
            description: rule.description,
            detail: rule.pattern
        }));

        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: '请选择一个正则表达式',
            matchOnDescription: true,
            matchOnDetail: true
        });

        if (selected) {
            // 查找选中的规则
            const rule = this.predefinedRules.find(r => r.name === selected.label);
            if (rule) {
                // 将选中的正则表达式插入到当前光标位置
                const editor = vscode.window.activeTextEditor;
                if (editor) {
                    editor.edit(editBuilder => {
                        editBuilder.insert(editor.selection.active, rule.pattern);
                    });

                    // 显示信息消息
                    vscode.window.showInformationMessage(`已插入正则表达式: ${rule.name}`);
                }
            }
        }
    }

    /**
     * 获取所有预定义规则
     */
    public getPredefinedRules(): RegexRule[] {
        return this.predefinedRules;
    }

    /**
     * 根据ID获取特定规则
     */
    public getRuleById(id: string): RegexRule | undefined {
        return this.predefinedRules.find(rule => rule.id === id);
    }
}