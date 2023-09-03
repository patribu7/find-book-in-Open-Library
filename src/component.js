const imgSize = 'M';
let library = [];

class Seeker {
    constructor(urlSite, type, search) {
        this.urlSite = urlSite;
        this.type = type;
        this.search = search;
        this.url = urlSite + type + search + ".json";
    }
    
    async get() {
        const response = await fetch(this.url);
        const response_json = await response.json();
        response_json.works.forEach(book => {
            book.imgUrl = 'https://covers.openlibrary.org/b/id/' + book.imgId + '-' + imgSize + '.jpg';
            book.authorsList = [];
            book.authors.forEach(author =>
                book.authorsList.push(author.name)
            );
            library.push(book)

        });
    }
}

let request = new Seeker('https://openlibrary.org/', 'subjects/', 'fantasy');
request.get();

console.log(library)