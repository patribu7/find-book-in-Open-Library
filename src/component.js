import ndCover from "./image-component"
import * as bootstrap from 'bootstrap';

class foo {
    constructor() {
        this.x = 'sono un foo'
    }
    y() {
        this.x = 'sono un goo, una cosa diversa'
    }
}






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
        let cards = new Cards();
        this.btn.remove()
        books.get()
            .then(library => setProperty(library))
            .then(library => {
                cards.create(library);
                cards.show();
                new btnScroll(books)
            })
    }
}

class Cards {
    constructor() {

    }
    create(library) {
        this.library = library;
        this.library.forEach(book => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.style.width = '15rem';


            card.style.display = 'none';

            card.innerHTML = ` 
            <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text overflow-auto" style="max-height: 80px" >${book.authorsList}</p>
            <img src="${book.imgUrl}" class="card-img-top" alt="cover">
            </div>
            `;
            cardsPlace.appendChild(card);



            card.addEventListener('click', () => {
                let searchBookProperty = new SearchParameters('', book.key);
                let bookProprety = searchBookProperty.get();
                let printDescription = async () => {
                    bookProprety = await bookProprety;


                    [card].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
                    $(card).attr('data-bs-toggle', 'popover');
                    $(card).attr('data-bs-trigger', 'hover focus');
                    $(card).attr('data-bs-content', bookProprety.description.value);



                    console.log(bookProprety.description)
                }
                printDescription()



            })

        })


    }

    // correggere sopra display none e quanto segue:
    hide() {
        document.getElementsByClassName('card')
            .forEach(card => { card.style.display = 'none'; })
    }
    show() {
        $(".card").css("display", "");

    }
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

        let placeholder = new Placeholder();
        let cards = new Cards();
        let research = new SearchParameters(searchSelectType.value, searchInput.value);
        research.get()
            .then(library => {
                placeholder.create();
                return library;
            })
            .then(library => setProperty(library))
            .then(library => {

                filterReport.innerHTML = `trovati ${library.count} libri`;
                cards.create(library);

            })
            .then(() => {
                cards.show();


                if (document.getElementById('btn-scroll')) {
                    document.getElementById('btn-scroll').remove()

                    new btnScroll(research);
                } else {
                    new btnScroll(research);
                }
            })
            .then(() => placeholder.remove())
    }
})