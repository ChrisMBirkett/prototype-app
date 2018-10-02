export class Log {
    Level: string;
    Messages: string[];
    Error: string;

    constructor(level: string, messages: string[], error?: string) {
        this.Level = level;
        this.Messages = messages;
        this.Error = error;
    }

    toString() {
        return new Date() + ": " + this.Messages + " - " + this.Error;
    }
}