const filterReport = document.getElementById('filter-report');
const searchInput = document.getElementById('search-input');
const searchSelectType = document.getElementById('search-type');
const cardsPlace = document.getElementById('cards-place');
const urlSite = 'https://openlibrary.org';
const imgSize = 'M';

filterReport.innerHTML = `trovati 0 libri`; 

class SearchParameters {
    constructor(urlSite, type, search) {
        this.urlSite = urlSite;
        this.type = type;
        this.search = search;
        this.url = urlSite + type + search + ".json";

    }
    async get() {
        const response = await fetch(this.url);
        const json = await response.json();
        return json

    }

}

 function setProperty(books) {
    books.forEach(book => {
        book.imgUrl = 'https://covers.openlibrary.org/b/id/' + book.cover_id + '-' + imgSize + '.jpg';
        book.authorsList = [];
        book.authors.forEach(author => book.authorsList.push(author.name));
    });
    return books

}

 function createCards(books) {

    books.forEach(book => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '15rem';
        card.innerHTML = ` 
        <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">${book.authorsList}</p>
        <img src="${book.imgUrl}" class="card-img-top" alt="cover">
        </div>
        `;
        cardsPlace.appendChild(card);
        card.addEventListener('click', () => {
            let searchBookProperty = new SearchParameters(urlSite, '', book.key);
            let bookProprety = searchBookProperty.get();
            let printDescription = async () => {
                bookProprety = await bookProprety
                
                console.log(bookProprety.description)
            }
            printDescription()

        })

    });


}



document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let research = new SearchParameters(urlSite, searchSelectType.value, 'fantasy');
        research.get()
        .then(books => setProperty(books.works))
        .then(books => {
            createCards(books); filterReport.innerHTML = `trovati ${books.length} libri`; 
        })

        


    }
})