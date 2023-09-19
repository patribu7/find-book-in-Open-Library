const filterReport = document.getElementById('filter-report');
filterReport.innerHTML = `trovati 0 libri`;
const searchInput = document.getElementById('search-input');
const searchSelectType = document.getElementById('search-type');
const cardsPlace = document.getElementById('cards-place');

const urlSite = 'https://openlibrary.org';
const imgSize = 'M';


class SearchParameters {
    constructor(type, search) {

        if (type.includes('json')) {
            this.search = search.replace(' ', '+');
        } else {
            this.search = search + '.json';
        }
        this.type = type;

        this.limit = 4;
        this.offset = 0;

    }
    async get() {
        this.url = urlSite + this.type + this.search + '?limit=' + this.limit + '&offset=' + this.offset;
        const response = await fetch(this.url);
        const json = await response.json();
        return json
    }
}

function setProperty(library) {
    if (searchSelectType.value === '/subjects/') {
        library.works.count = library.work_count;
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

class btnScroll {
    constructor(books) {
        this.btn = document.createElement('button');
        this.btn.innerHTML = 'show more';
        this.btn.style.width = '100%';
        $(this.btn).insertAfter(cardsPlace)
        this.btn.addEventListener('click', () => this.showOthers(books));
    }

    showOthers(books) {
        books.offset = books.offset + books.limit;
        this.btn.remove()
        books.get()
            .then(library => setProperty(library))
            .then(library => {
                createCards(library);
                new btnScroll(books)
            })
    }
}

function createCards(library) {
    library.forEach(book => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '15rem';
        card.setAttribute('data-bs-toggle', 'popover');
        card.setAttribute('data-bs-content', 'test');

        card.innerHTML = ` 
        <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">${book.authorsList}</p>
        <img src="${book.imgUrl}" class="card-img-top" alt="cover">
        </div>
        `;
        cardsPlace.appendChild(card);
        card.addEventListener('click', () => {
            let searchBookProperty = new SearchParameters('', book.key);
            let bookProprety = searchBookProperty.get();

            let printDescription = async () => {
                bookProprety = await bookProprety
                
                console.log(bookProprety.description)
            }
            printDescription()
        })
    });

}

class Placeholder {
    constructor() {
        this.card = document.createElement('div');
        this.card.classList.add('card');
        this.card.style.width = '15rem';
        this.card.innerHTML = ` 
        <div class="card-body">
          <h5 class="card-title placeholder-glow"><span class="placeholder col-6"></span></h5>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-4"></span>
            <span class="placeholder col-7"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-3"></span>
          </p>
          <div class="placeholder-wave card-img-bottom" style="width: 100%; height: 230px; background-color: gray;" alt="..."></div>
        </div>
        `;
    }

    create() {
        cardsPlace.appendChild(this.card);
    }
    remove() {
        this.card.remove()
    }

}

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        cardsPlace.innerHTML = '';
        let research = new SearchParameters(searchSelectType.value, searchInput.value);
        research.get()
            .then(library => setProperty(library))
            .then(library => {
                createCards(library);
                filterReport.innerHTML = `trovati ${library.count} libri`;
                new btnScroll(research);

            })
    }
})