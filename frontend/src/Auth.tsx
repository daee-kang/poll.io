class Auth {
    static authenticateUser(token: string) {
        localStorage.setItem('token', token);
    }

    static isUserAuthenticated(): boolean {
        return localStorage.getItem('token') !== null;
    }

    static deauthenticateUser() {
        localStorage.removeItem('token');
    }

    static getToken(): string | null {
        return localStorage.getItem('token');
    }
}

export default Auth;