const searchInput = document.getElementById('search-input');
const searchSelectType = document.getElementById('search-type');
const cardsPlace = document.getElementById('cards');
const urlSite = 'https://openlibrary.org';
const imgSize = 'M';



class Seeker {
    constructor(urlSite, type, search) {
        this.urlSite = urlSite;
        this.type = type;
        this.search = search;
        this.url = urlSite + '/' + type + '/' + search + ".json";

    }
    async getLibrary() {
        const response = await fetch(this.url);
        const books = await response.json();
        books.works.forEach(book => {
            book.imgUrl = 'https://covers.openlibrary.org/b/id/' + book.cover_id + '-' + imgSize + '.jpg';
            book.authorsList = [];
            book.authors.forEach(author => book.authorsList.push(author.name));
        })
        return books.works
    }
    async createCards() {
        let library = await this.getLibrary();
        library.forEach(book => {
            makeCard(cardsPlace, book.title, book.authorsList, book.imgUrl)

            console.log(book)
            
        });
     }
}

function makeCard(parent, title, authors, imgUrl) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.style.width = '15rem';
    card.innerHTML =` 
    <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${authors}</p>
    <img src="${imgUrl}" class="card-img-top" alt="cover">
    </div>
    `;
    parent.appendChild(card)
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let research = new Seeker(urlSite, searchSelectType.value, 'fantasy');
        research.createCards()

    }
})
