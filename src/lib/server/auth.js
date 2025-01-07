import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

const JWT_SECRET = 'your_jwt_secret'; // Gunakan kunci rahasia yang kuat
const JWT_EXPIRATION = '30d'; // Masa berlaku token

export const sessionCookieName = 'auth';

/**
 * Buat token JWT untuk sesi pengguna
 * @param {Object} userData - Data pengguna untuk token
 * @returns {string} - Token JWT
 */
export function generateJwtToken(userData) {
    return jwt.sign(userData, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

/**
 * @param {import("@sveltejs/kit").RequestEvent} event
 * @param {string} token
 */
export function setJwtTokenCookie(event, token) {
    event.cookies.set(sessionCookieName, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 hari
    });
}

/**
 * @param {import("@sveltejs/kit").RequestEvent} event
 */
export function deleteJwtTokenCookie(event) {
    event.cookies.delete(sessionCookieName, {
        path: '/',
    });
}
