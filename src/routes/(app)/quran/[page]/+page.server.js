export function load({ params }) {

    const pageNumber = parseInt(params.page);

    return {
        pageNumber
    };
}  


export const actions = {
    default: async (event) => {

        const formData = await event.request.formData()
        const id = formData.get('id')
        const juz = formData.get('juz')
        const surah = formData.get('surah')
        const page = formData.get('page_number')
        const ayat = formData.get('ayat')

        try {
            await db.insert(table.plan).values({ id, name, targetKhatam: target, members, filledMembers: 1 });
            await db.insert(table.member).values({ name, planId: id });

            return {
                message: 'Data inserted successfully', status: 'OK'
            };
        } catch (e) {
            return fail(500, { message: e.message, status: 'Not OK' });
        }
    }
}
