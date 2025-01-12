import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';

export const load = async ({ url, locals }) => {
    const id = url.pathname.replace('/tadarus/', '');
    const name = locals?.user.name;

    try {
        // Query data dari tabel `plan` dan join dengan tabel `member`
        const planWithMembers = await db
            .select({
                plan: table.plan,
                members: table.member,
                tadarus: table.tadarus,
            })
            .from(table.plan)
            .leftJoin(table.member, eq(table.member.planId, table.plan.id)) // Join dengan member
            .leftJoin(table.tadarus, eq(table.tadarus.memberId, table.member.id))
            .where(eq(table.plan.id, id)); // Filter berdasarkan ID plan

        return { plan: planWithMembers, name: name }; // Kembalikan hasil query
    } catch (error) {
        console.error('Error fetching data:', error);
        return fail(500, { message: error.message });
    }
};

export const actions = {
    join: async (event) => {

        const formData = await event.request.formData()
        const id = formData.get('id')
        const name = formData.get('name')

        try {
            await db.insert(table.member).values({ name, planId: id });

            return {
                message: 'Data inserted successfully', status: 'OK'
            };
        } catch (e) {
            return fail(500, { message: e.message, status: 'Not OK' });
        }
    },
    claim: async (event) => {

        const formData = await event.request.formData()
        const id = formData.get('id')
        const juz = formData.get('juz')

        try {
            await db.insert(table.tadarus).values({ juz, memberId: id });

            return {
                message: 'Data inserted successfully', status: 'OK'
            };
        } catch (e) {
            return fail(500, { message: e.message, status: 'Not OK' });
        }
    },
    deletePlan: async (event) => {

        const formData = await event.request.formData()
        const id = formData.get('id')

        try {
            await db.delete(table.plan).where(eq(table.plan.id, id))

        } catch (e) {
            return fail(500, { message: e.message, status: 'Not OK' });
        }
        return redirect(302, '/tadarus');
    },
    deleteJuz: async (event) => {

        const formData = await event.request.formData()
        const id = formData.get('id')

        try {
            await db.delete(table.tadarus).where(eq(table.tadarus.id, id))
            return {
                message: 'Data deleted successfully', status: 'OK'
            };
        } catch (e) {
            return fail(500, { message: e.message, status: 'Not OK' });
        }
    }
};
