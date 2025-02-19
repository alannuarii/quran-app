import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq, desc, sum, asc } from 'drizzle-orm';
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
                totalAmount: sum(table.progress.amount),
                createdAt: table.progress.createdAt
            })
            .from(table.plan)
            .leftJoin(table.member, eq(table.member.planId, table.plan.id))
            .leftJoin(table.progress, eq(table.progress.memberId, table.member.id))
            .groupBy(table.plan.id, table.member.id, table.progress.endJuz, table.progress.endSurah, table.progress.endPage, table.progress.endAyat, table.progress.createdAt)
            .where(eq(table.member.name, user))
            .orderBy(desc(table.progress.createdAt))

        const progress = await db
            .select({
                name: table.member.name,
                idMember: table.member.id,
                juz: table.tadarus.juz,
                totalAmount: sum(table.progress.amount)
            })
            .from(table.plan)
            .leftJoin(table.member, eq(table.member.planId, table.plan.id))
            .leftJoin(table.tadarus, eq(table.tadarus.memberId, table.member.id))
            .leftJoin(table.progress, eq(table.progress.memberId, table.member.id))
            .groupBy(table.member.name, table.tadarus.juz, table.member.id)
            .where(eq(table.member.name, user))
            .orderBy(asc(table.tadarus.juz))

        return { tadarus, progress }; // Kembalikan hasil query
    } catch (error) {
        console.error('Error fetching data:', error);
        return fail(500, { message: error.message });
    }
};


  
  