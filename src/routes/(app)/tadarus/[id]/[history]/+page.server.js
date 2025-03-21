import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq, asc } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';


export const load = async ({ params }) => {

    const id = params.history

    try {
        // Query data dari tabel `plan` dan join dengan tabel `member`
        const progress = await db
            .select({
                id: table.progress.id,
                juz: table.progress.endJuz,
                surah: table.progress.endSurah,
                page: table.progress.endPage,
                ayat: table.progress.endAyat,
                amount: table.progress.amount,
                time: table.progress.createdAt,
            })
            .from(table.progress)
            .where(eq(table.progress.memberId, id))
            .orderBy(asc(table.progress.createdAt))

        const juz = await db
            .select({
                juz: table.tadarus.juz,
            })
            .from(table.tadarus)
            .where(eq(table.tadarus.memberId, id))
            .orderBy(asc(table.tadarus.juz))

        return { progress, juz };
    } catch (error) {
        console.error('Error fetching data:', error);
        return fail(500, { message: error.message });
    }
};