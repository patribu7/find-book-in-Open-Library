import ndCover from "./image-component"


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
            if (book.cover_id != null) {
                book.imgUrl = 'https://covers.openlibrary.org/b/id/' + book.cover_id + '-' + imgSize + '.jpg';
            } else {
                book.imgUrl = ndCover.src;
            };

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
        this.btn.id = 'btn-scroll';
        $(this.btn).insertAfter(cardsPlace)
        this.btn.addEventListener('click', () => this.showOthers(books));
    }

    showOthers(books) {
        books.offset = books.offset + books.limit;


        let placeholder = new Placeholder();
        placeholder.create()
            .then(() => books.get()

            )
            .then(library => setProperty(library))
            .then(library => {
                library.forEach(book => {
                    let card = new Card(book);
                    card.create();
                })
            })
            .then(library => {
                placeholder.remove();



            })


    }
}

class Card {
    constructor(book) {
        this.card = document.createElement('div');
        this.card.classList.add('card');
        this.card.style.width = '15rem';

        this.card.innerHTML = ` 
            <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text overflow-auto" style="max-height: 80px" >${(book.authorsList).join(', ')}</p>
            <img src="${book.imgUrl}" class="card-img-top" alt="cover">
            </div>
            `;
        this.card.addEventListener('click', () => {
            let searchBookProperty = new SearchParameters('', book.key);
            let bookProprety = searchBookProperty.get();
            let popup = new PopupIn(this.card);
            let printDescription = async () => {
                bookProprety = await bookProprety;
                popup.addText(bookProprety.description)

            }
            printDescription()

        })
    }
    create() {
        cardsPlace.appendChild(this.card);
    }

}

class PopupIn {
    constructor(card) {
        this.descr = document.createElement('div');
        this.descr.classList.add('position-absolute', 'top-0', 'start-0', 'overflow-auto');
        this.descr.style.width = '100%';
        this.descr.style.height = '100%';
        this.descr.style.background = 'rgba(251, 248, 237, 0.85)';


        card.appendChild(this.descr)
    }

    addText(description) {
        if (typeof description === 'object') {
            this.description = description.value
        } else {
            this.description = description
        }
        this.descr.innerHTML = this.description

    }

    appear() { }
    disapper() { }
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

    async create() {
        await cardsPlace.appendChild(this.card);
    }
    remove() {
        this.card.remove()
    }

}

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        cardsPlace.innerHTML = '';

        let placeholder = new Placeholder();
        let research = new SearchParameters(searchSelectType.value, searchInput.value);

        placeholder.create()
            .then(() => research.get())
            .then(library => setProperty(library))
            .then(library => {
                filterReport.innerHTML = `trovati ${library.count} libri`;
                library.forEach(book => {
                    let card = new Card(book);
                    card.create();
                })

            })
            .then(() => {
                placeholder.remove();

                if (document.getElementById('btn-scroll') != null) {
                    $('#btn-scroll').remove()
                    new btnScroll(research)
                } else {
                    new btnScroll(research)
                };

            })
    }
})