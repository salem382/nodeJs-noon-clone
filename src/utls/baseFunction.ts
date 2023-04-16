import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const generateToken = (payload:any) => {
    return jwt.sign(payload, 'myNameIsUser');
}

export async function verifyPassword(plainPassword: string, hashedPassword: any ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
}