import { Logger } from "../../config/logger.config.js"
import { AuthRepository } from "./auth.repository.js"

export class AuthService {

    private readonly logger = Logger.getInstance()
    constructor(
        private readonly authRepository: AuthRepository
    ) { }

    login(email: string, password: string) {

        this.logger.debug(`User with email: ${email} and password: ${password}`)
        return {
            email,
            password
        }
    }
}