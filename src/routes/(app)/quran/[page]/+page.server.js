export function load({ params }) {

    const pageNumber = parseInt(params.page);

    return {
        pageNumber
    };
}  
