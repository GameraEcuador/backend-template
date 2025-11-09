export class HandlerErrors {
    constructor() { }

    private static parseError(code: number, message?: string): never {
        throw new Error(JSON.stringify({
            status: code,
            message: message || "An error occurred"
        }));
    }

    // 400 - Bad Request
    static badRequest(message?: string) {
        this.parseError(400, message || "Bad Request");
    }

    // 401 - Unauthorized
    static unauthorized(message?: string) {
        this.parseError(401, message || "Unauthorized");
    }

    // 403 - Forbidden
    static forbidden(message?: string) {
        this.parseError(403, message || "Forbidden");
    }

    // 404 - Not Found
    static notFound(message?: string) {
        this.parseError(404, message || "Resource not found");
    }

    // 405 - Method Not Allowed
    static methodNotAllowed(message?: string) {
        this.parseError(405, message || "Method Not Allowed");
    }

    // 409 - Conflict
    static conflict(message?: string) {
        this.parseError(409, message || "Conflict");
    }

    // 422 - Unprocessable Entity
    static unprocessableEntity(message?: string) {
        this.parseError(422, message || "Unprocessable Entity");
    }

    // 429 - Too Many Requests
    static tooManyRequests(message?: string) {
        this.parseError(429, message || "Too Many Requests");
    }

    // 500 - Internal Server Error
    static internalServerError(message?: string) {
        this.parseError(500, message || "Internal Server Error");
    }

    // 501 - Not Implemented
    static notImplemented(message?: string) {
        this.parseError(501, message || "Not Implemented");
    }

    // 502 - Bad Gateway
    static badGateway(message?: string) {
        this.parseError(502, message || "Bad Gateway");
    }

    // 503 - Service Unavailable
    static serviceUnavailable(message?: string) {
        this.parseError(503, message || "Service Unavailable");
    }

    // 504 - Gateway Timeout
    static gatewayTimeout(message?: string) {
        this.parseError(504, message || "Gateway Timeout");
    }
}