export const removeDuplicates = (array) => {
    // Create a Set from the array to automatically filter out duplicates  
    const uniqueSet = new Set(array);

    // Convert the Set back to an array  
    const uniqueArray = Array.from(uniqueSet);

    return uniqueArray;
} 