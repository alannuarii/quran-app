import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq, asc, and, isNotNull } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';


export const load = async ({ params }) => {

    const id = params.id

    try {
        // Query data dari tabel `plan` dan join dengan tabel `member`
        const progress = await db
            .select({
                id: table.progress.id,
                name: table.member.name,
                juz: table.progress.endJuz,
                surah: table.progress.endSurah,
                page: table.progress.endPage,
                ayat: table.progress.endAyat,
                amount: table.progress.amount,
                time: table.progress.createdAt
            })
            .from(table.plan)
            .leftJoin(table.member, eq(table.member.planId, table.plan.id))
            .leftJoin(table.progress, eq(table.progress.memberId, table.member.id))
            .where(and(eq(table.plan.id, id), isNotNull(table.progress.amount)))

        return { progress };
    } catch (error) {
        console.error('Error fetching data:', error);
        return fail(500, { message: error.message });
    }
};