import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq, asc, desc } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';
import { countAmountAyat } from '../../../../../../lib/utils/helper'


export const load = async ({ params }) => {

    const pageNumber = parseInt(params.page);
    const memberId = params.memberId

    try {
        const juz = await db
            .select({
                juz: table.tadarus.juz,
            })
            .from(table.tadarus)
            .where(eq(table.tadarus.memberId, memberId))
            .orderBy(asc(table.tadarus.juz))

        const lastRead = await db
            .select({
                juz: table.progress.endJuz,
                ayat: table.progress.endAyat
            })
            .from(table.progress)
            .where(eq(table.progress.memberId, memberId))
            .orderBy(desc(table.progress.createdAt))

        return { pageNumber, memberId, juz, lastRead };
    } catch (error) {
        console.error('Error fetching data:', error);
        return fail(500, { message: error.message });
    }
}


export const actions = {
    default: async (event) => {

        const formData = await event.request.formData()
        const id = formData.get('id')
        const startJuz = formData.get('start_juz')
        const startSurah = formData.get('start_surah')
        const startPage = formData.get('start_page_number')
        const startAyat = formData.get('start_ayat')
        const endJuz = formData.get('end_juz')
        const endSurah = formData.get('end_surah')
        const endPage = formData.get('end_page_number')
        const endAyat = formData.get('end_ayat')

        const amount = countAmountAyat(parseInt(startSurah), parseInt(startAyat), parseInt(endSurah), parseInt(endAyat))

        try {
            await db.insert(table.progress).values({ startJuz, startSurah, startPage, startAyat, endJuz, endSurah, endPage, endAyat, amount, memberId: id });

            return {
                message: 'Data inserted successfully', status: 'OK'
            };
        } catch (e) {
            return fail(500, { message: e.message, status: 'Not OK' });
        }
    }
}
