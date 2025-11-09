export class HandlerErrors {
    constructor() { }

    private static parseError(code: number, message?: string): never {
        throw new Error(JSON.stringify({
            status: code,
            message: message || "Resource not found"
        }));
    }

    static notFound(message?: string) {
        this.parseError(404, message);
    }

    static badRequest(message?: string) {
        this.parseError(400, message);
    }

    static forbidden(message?: string) {
        this.parseError(403, message);
    }

}