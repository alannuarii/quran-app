import { fail, redirect } from '@sveltejs/kit';
import { hash } from '@node-rs/argon2';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { generateUserId } from '../../../lib/utils/random';

export const actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        // Hash password
        const passwordHash = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        });
        const userId = generateUserId();

        try {
            // Masukkan pengguna ke dalam database
            await db.insert(table.user).values({ id: userId, name, email, passwordHash });

        } catch (e) {
            // Gagal menyimpan ke database
            return fail(500, { message: e.message });
        }
        
        return redirect(302, '/login');
    },
};
