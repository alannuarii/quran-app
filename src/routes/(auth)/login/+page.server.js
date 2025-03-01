import { hash, verify } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        // Validasi input
        if (!validateEmail(email)) {
            return fail(400, { message: 'Invalid email or password' });
        }
        if (!validatePassword(password)) {
            return fail(400, { message: 'Invalid email or password' });
        }

        // Periksa apakah email ada di database
        const results = await db.select().from(table.user).where(eq(table.user.email, email));
        const existingUser = results.at(0);

        if (!existingUser) {
            return fail(400, { message: 'Invalid email or password' });
        }

        // Verifikasi password
        const validPassword = await verify(existingUser.passwordHash, password);
        if (!validPassword) {
            return fail(400, { message: 'Invalid email or password' });
        }

        // Buat token JWT
        const token = auth.generateJwtToken({
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
        });

        // Set cookie JWT
        auth.setJwtTokenCookie(event, token);

        // Ambil URL tujuan dari cookies
        const redirectUrl = event.cookies.get('redirectUrl') || '/';

        // Hapus URL tujuan dari cookies
        event.cookies.delete('redirectUrl', { path: '/' });

        // Redirect ke URL tujuan
        throw redirect(302, decodeURIComponent(redirectUrl));
    }
};

function validateEmail(email) {
    return (
        typeof email === 'string' &&
        email.length >= 5 &&
        email.length <= 255 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
}

function validatePassword(password) {
    return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}