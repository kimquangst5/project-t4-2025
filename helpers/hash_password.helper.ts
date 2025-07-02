import bcrypt from "bcrypt";

const hash_password = async (plain_password: string) => {
    try {
        const hash = await bcrypt.hash(plain_password, 12);
        return hash;
    } catch (err) {
        console.error("Lỗi mã hóa mk:", err);
        throw err;
    }
};

const verify_password = async (plain_password: string, hashed_password: any) => {
    try {
        const match = await bcrypt.compare(plain_password, hashed_password);
        return match;
    } catch (err) {
        console.error("Lỗi xác thực:", err);
        throw err;
    }
}

export { hash_password, verify_password };