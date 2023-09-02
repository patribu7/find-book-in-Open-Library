let testUrl = "https://openlibrary.org/subjects/fantasy.json";

export default class Seeker {
    constructor(urlSite, type, search) {
        this.urlSite = urlSite;
        this.type = type;
        this.search = search;
        this.url = urlSite + type + search + ".json";
    }
    
    async get() {
        const response = await fetch(this.url);
        const response_json = await response.json();
        this.books = response_json.works
    }
}

class BookCard {
    constructor(title, authors, imgUrl, available) {
        this.title = title;
        this.authors = authors;
        this.imgUrl = imgUrl;
        this.free = free;
        this.available = available
    }
}