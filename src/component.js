const searchInput = document.getElementById('search-input');
const searchSelectType = document.getElementById('search-type');

const urlSite = 'https://openlibrary.org';
const imgSize = 'M';


class Seeker {
    constructor(urlSite, type, search) {
        this.urlSite = urlSite;
        this.type = type;
        this.search = search;
        this.url = urlSite + '/' + type + '/' + search + ".json";
        // this.library = []

    }
    async getLibrary() {
        const response = await fetch(this.url);
        const books = await response.json();
        books.works.forEach(book => {
            book.imgUrl = 'https://covers.openlibrary.org/b/id/' + book.imgId + '-' + imgSize + '.jpg';
            book.authorsList = [];
            book.authors.forEach(author => book.authorsList.push(author.name));
        })
        return books.works
    }
    async createCards() {
        let library = await this.getLibrary();
        library.forEach(book => {
            console.log(book.title, book.authorsList, book.imgUrl)
            
        });
     }
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let research = new Seeker(urlSite, searchSelectType.value, 'fantasy');
        research.createCards()




    }
})
