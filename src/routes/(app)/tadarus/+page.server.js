import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

const name = 'Alan Nuari'

export const load = async () => {
    try {
        const plans = await db.select().from(table.user);
        return { plans };
    } catch (error) {
        console.error('Error fetching data:', error);
        return fail(500, { message: error.message });
    }
};

export const actions = {
    default: async (event) => {
        const formData = await event.request.formData()
        const id = formData.get('id')
        const target = formData.get('target')
        const anggota = formData.get('anggota')

        const name = 'ALan Nuari'

        try {
            await db.insert(table.plan).values({ id, name, targetKhatam: target, anggota: anggota });

            return {
                message: 'Data inserted successfully', status: 'OK'
            };
        } catch (e) {
            return fail(500, { message: e.message, status: 'Not OK' });
        }
    }
}