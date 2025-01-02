import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';

const name = 'Alan Nuari'

export const load = async ({ url }) => {
    const id = url.pathname.replace('/tadarus/', '')
    try {
        const plan = await db.select().from(table.plan).where(eq(table.plan.id, id));
        return { plan };
    } catch (error) {
        console.error('Error fetching data:', error);
        return fail(500, { message: error.message });
    }
};