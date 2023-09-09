const filterReport = document.getElementById('filter-report');
filterReport.innerHTML = `trovati 0 libri`; 
const searchInput = document.getElementById('search-input');
const searchSelectType = document.getElementById('search-type');
const cardsPlace = document.getElementById('cards-place');
const urlSite = 'https://openlibrary.org';
const imgSize = 'M';


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

 function setProperty(library) {

    library.works.forEach(book => {
        book.imgUrl = 'https://covers.openlibrary.org/b/id/' + book.cover_id + '-' + imgSize + '.jpg';
        book.authorsList = [];
        book.authors.forEach(author => book.authorsList.push(author.name));
    });
    console.log(library)
    return library

}

 function createCards(library) {
    library.works.forEach(book => {
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

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        cardsPlace.innerHTML = '';
        let research = new SearchParameters(urlSite, searchSelectType.value, searchInput.value);
        research.get()
        .then(library => setProperty(library))
        .then(library => {
            createCards(library);
            console.log(library)
            filterReport.innerHTML = `trovati ${library.work_count} libri`; 
        })

        


    }
})