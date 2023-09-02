let testUrl = "https://openlibrary.org/subjects/fantasy.json";

class Library {
    constructor(title, authors, imgUrl, available) {
        this.title = title;
        this.authors = authors;
        this.imgUrl = imgUrl;
        this.available = available
    }
}
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
        this.books = response_json.works;
        console.log(this.books)
    }

};

let request = new Seeker('https://openlibrary.org/', 'subjects/', 'fantasy');
request.get();

let library = new Library(request.books)
