import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq, desc } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';


export const load = async ({ locals }) => {
    const user = locals.user.name

    try {
        const tadarus = await db
            .select({
                idPlan: table.plan.id,
                idMember: table.member.id,
                juz: table.progress.endJuz,
                surah: table.progress.endSurah,
                page: table.progress.endPage,
                ayat: table.progress.endAyat,
                createdAt: table.progress.createdAt
            })
            .from(table.plan)
            .leftJoin(table.member, eq(table.member.planId, table.plan.id)) // Join dengan member
            .leftJoin(table.progress, eq(table.progress.memberId, table.member.id))
            .groupBy(table.plan.id, table.member.id, table.progress.endJuz, table.progress.endSurah, table.progress.endPage, table.progress.endAyat, table.progress.createdAt)
            .where(eq(table.member.name, user))
            .orderBy(desc(table.progress.createdAt))

        return { tadarus }; // Kembalikan hasil query
    } catch (error) {
        console.error('Error fetching data:', error);
        return fail(500, { message: error.message });
    }
};