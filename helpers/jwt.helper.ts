const jwt = require("jsonwebtoken");

const jwt_create = (
    payload: any,
    secret_key: any,
    options = {
        expiresIn: "1h",
    },
) => {
    return jwt.sign(payload, secret_key, options);
};

const jwt_verify = (token: string, secret_key: any) => {
    try {
        return jwt.verify(token, secret_key);
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return null;
    }
}

const jwt_decode = (token: string) => {
    return jwt.decode(token);
}

export { jwt_create, jwt_verify, jwt_decode };