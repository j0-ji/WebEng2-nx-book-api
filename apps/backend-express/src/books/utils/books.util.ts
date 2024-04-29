function checkIfCreateBookDto(obj) {
    return (
        Object.keys(obj).length === 4 &&
        'title' in obj && typeof obj['title'] === 'string' &&
        'author' in obj && typeof obj['author'] === 'string' &&
        'genre' in obj && typeof obj['genre'] === 'string' &&
        'year' in obj && typeof obj['year'] === 'number'
    );
}

function checkIfUpdateBookDto(obj) {
    let count = 0;
    if('title' in obj && typeof obj['title'] === 'string') {
        count++;
    }
    if('author' in obj && typeof obj['author'] === 'string') {
        count++;
    }
    if('genre' in obj && typeof obj['genre'] === 'string') {
        count++;
    }
    if('year' in obj && typeof obj['year'] === 'number') {
        count++;
    }
    return count === Object.keys(obj).length;
}


export { checkIfCreateBookDto, checkIfUpdateBookDto };
