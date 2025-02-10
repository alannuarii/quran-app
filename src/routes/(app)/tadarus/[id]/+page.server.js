import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq, and, desc, asc, sum} from 'drizzle-orm';
import * as table from '$lib/server/db/schema';
import { parseJuzRange } from '../../../../lib/utils/helper'

export const load = async ({ url, locals }) => {
    const id = url.pathname.replace('/tadarus/', '');

    try {
        // Query data dari tabel `plan` dan join dengan tabel `member`
        const jusz = await db
            .select({
                id: table.plan.id,
                inisiator: table.plan.name,
                targetKhatam: table.plan.targetKhatam,
                anggota: table.plan.members,
                member: table.member.name,
                memberId: table.member.id,
                juz: table.tadarus.juz,
            })
            .from(table.plan)
            .leftJoin(table.member, eq(table.member.planId, table.plan.id)) // Join dengan member
            .leftJoin(table.tadarus, eq(table.tadarus.memberId, table.member.id))
            .where(eq(table.plan.id, id))
            .orderBy(asc(table.tadarus.juz))

        const allProgress = await db
            .select({
                id: table.member.id,
                juz: table.progress.endJuz,
                surah: table.progress.endSurah,
                page: table.progress.endPage,
                ayat: table.progress.endAyat,
                amount: table.progress.amount
            })
            .from(table.plan)
            .leftJoin(table.member, eq(table.member.planId, table.plan.id)) // Join dengan member
            .leftJoin(table.progress, eq(table.progress.memberId, table.member.id))
            .where(and(eq(table.plan.id, id), eq(table.member.name, locals.user.name)))
            .orderBy(desc(table.progress.endAyat))

        const amount = await db
            .select({
                amount: table.progress.amount
            })
            .from(table.plan)
            .leftJoin(table.member, eq(table.member.planId, table.plan.id))
            .leftJoin(table.progress, eq(table.progress.memberId, table.member.id))
            .where(eq(table.plan.id, id))

        const progressMembers = await db
            .select({
                name: table.member.name,
                juz: table.tadarus.juz,
                totalAmount: sum(table.progress.amount)
            })
            .from(table.plan)
            .leftJoin(table.member, eq(table.member.planId, table.plan.id))
            .leftJoin(table.tadarus, eq(table.tadarus.memberId, table.member.id))
            .leftJoin(table.progress, eq(table.progress.memberId, table.member.id))
            .where(eq(table.plan.id, id))
            .groupBy(table.member.name, table.tadarus.juz)

        return { plan: jusz, progress: allProgress, amount, progressMembers }; // Kembalikan hasil query
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
        const formData = await event.request.formData();
        const id = formData.get('id');
        const juz = formData.get('juz');

        const arrayJuz = parseJuzRange(juz);

        try {
            for (const item of arrayJuz) {
                await db.insert(table.tadarus).values({ juz: item, memberId: id });
            }

            return {
                message: 'Data inserted successfully',
                status: 'OK'
            };
        } catch (error) {
            console.error('Error inserting data:', error);
            return {
                message: 'Error inserting data',
                status: 'Not OK'
            };
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
