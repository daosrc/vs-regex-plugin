export interface RegexRule {
    id: string;
    name: string;
    description: string;
    pattern: string;
    flags?: string;
    testCases?: string[];
}

export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
    matches?: RegExpMatchArray | null;
}