import { AuthRepository } from "./auth.repository.js";

export class AuthService {

    constructor(private authRepository: AuthRepository) { }

    login(email: string, password: string) {
        this.authRepository.login(email, password);
        return {
            email,
            password
        }
    }
}