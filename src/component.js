const filterReport = document.getElementById('filter-report');
filterReport.innerHTML = `trovati 0 libri`;
const searchInput = document.getElementById('search-input');
const searchSelectType = document.getElementById('search-type');
const cardsPlace = document.getElementById('cards-place');
const urlSite = 'https://openlibrary.org';
const imgSize = 'M';


class SearchParameters {
    constructor(urlSite, type, search) {

        if (type.includes('json')) {
            search = search.replace(' ', '+');
        } else {
            search = search + '.json';
        }

        this.url = urlSite + type + search;

    }
    async get() {
        const response = await fetch(this.url);
        const json = await response.json();
        return json

    }

}

function setProperty(library) {
    console.log(library)

    if (searchSelectType.value === '/subjects/') {
        library.works.count = library.work_count;
        console.log(library.count)
        library.works.forEach(book => {
            book.imgUrl = 'https://covers.openlibrary.org/b/id/' + book.cover_id + '-' + imgSize + '.jpg';
            book.authorsList = [];
            book.authors.forEach(author => book.authorsList.push(author.name)); // forse basta book.author.name
            
        });
        return library.works

    } else {
        library.docs.count = library.numFound;
        library.docs.forEach(book => {
            book.imgUrl = 'https://covers.openlibrary.org/b/id/' + book.cover_i + '-' + imgSize + '.jpg';
            book.authorsList = book.author_name;
        })
        return library.docs

    }
}

function createCards(library) {
    library.forEach(book => {
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
    filterReport.innerHTML = `trovati ${library.count} libri`;
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

            })
    }
})