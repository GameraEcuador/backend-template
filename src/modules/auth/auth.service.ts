import { AuthRepository } from "./auth.repository.js"
import { logger } from "../../config/logger.config.js"

export class AuthService {

    constructor(
        private readonly authRepository: AuthRepository
    ) { }

    login(email: string, password: string) {

        logger.debug(`User with email: ${email} and password: ${password}`)
        return {
            email,
            password
        }
    }
}