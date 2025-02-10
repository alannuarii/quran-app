import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq, count } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';


// export const load = async ({ locals }) => {

//     const name = locals?.user.name

//     try {
//         const plans = await db
//             .select({
//                 plan: table.plan,
//                 members: table.member,
//             })
//             .from(table.plan)
//             .leftJoin(table.member, eq(table.member.planId, table.plan.id)) // Join dengan member
//             .where(eq(table.member.name, name)); // Filter berdasarkan ID plan

//         return { plans: plans, name: name }; // Kembalikan hasil query
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return fail(500, { message: error.message });
//     }
// };

export const load = async () => {

    try {
        // Query data dari tabel `plan` dan join dengan tabel `member`
        const plansWithMemberCount = await db
            .select({
                planId: table.plan.id,
                planName: table.plan.name,
                members: table.plan.members,
                targetKhatam: table.plan.targetKhatam,
                membersCount: count(table.member.planId).as('membersCount'),
            })
            .from(table.plan)
            .leftJoin(table.member, eq(table.member.planId, table.plan.id))
            .groupBy(table.plan.id, table.plan.name, table.plan.members, table.plan.targetKhatam)

        const memberNames = await db
            .select({
                name: table.member.name,
                planId: table.member.planId
            })
            .from(table.member)

        return { plans: plansWithMemberCount, names: memberNames }; // Kembalikan hasil query
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
        const members = formData.get('members')
        const name = formData.get('name')

        try {
            await db.insert(table.plan).values({ id, name, targetKhatam: target, members });
            await db.insert(table.member).values({ name, planId: id });

            return {
                message: 'Data inserted successfully', status: 'OK'
            };
        } catch (e) {
            return fail(500, { message: e.message, status: 'Not OK' });
        }
    }
}