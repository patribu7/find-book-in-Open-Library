import ndCover from "./image-component"
import researchType from './researchType';
import { value_search, value_type } from "./getInputValue";
import filterReport from "./filters";

const cardsPlace = document.getElementById('cards-place');

class SearchParameters {
    constructor(type, search) {

        if (type.includes('json')) {

            this.search = search.replace(' ', '+');
            this.separator = '&';
        } else {
            this.search = search.replace(' ', '_') + '.json';
            this.separator = '?'
        }
        this.type = type;

        this.limit = 4;
        this.offset = 0;

    }
    async get() {
        this.url = process.env.URL_SITE + this.type + this.search.toLowerCase() + this.separator + 'limit=' + this.limit + '&offset=' + this.offset;

        const response = await fetch(this.url);
        const json = await response.json();
        console.log(json)
        return json
    }

}

function setProperty(library) {
    if (value_type() === researchType.subject) {
        library.works.count = library.work_count;
        library.works.forEach(book => {
            if (book.cover_id != null) {
                book.imgUrl = process.env.URL_COVER + book.cover_id + '-' + process.env.IMG_SIZE + '.jpg';
            } else {
                book.imgUrl = ndCover.src;
            };

            book.authorsList = [];
            book.authors.forEach(author => book.authorsList.push(author.name));


        });
        return library.works

    } else if (value_type() === researchType.authors) {
        library.docs.count = library.numFound;
        library.docs.forEach(author => {

            author.imgUrl = 'https://covers.openlibrary.org/a/olid/' + author.key + '-' + process.env.IMG_SIZE + '.jpg';
            author.authorsList = [];
            author.title = author.name;

        })
        return library.docs

    } else {
        library.docs.count = library.numFound;
        library.docs.forEach(book => {
            book.imgUrl = process.env.URL_COVER + book.cover_i + '-' + process.env.IMG_SIZE + '.jpg';
            book.authorsList = book.author_name;


        })
        return library.docs
    }
}
class BtnScroll {
    constructor() {
        this.text = 'SHOW MORE';
        this.id = 'btn-scroll';
        this.width = '100%';

    }
    create() {
        this.btn = document.createElement('button');
        this.btn.innerHTML = this.text;
        this.btn.style.width = this.width;

        this.btn.id = this.id;
        $(this.btn).insertAfter(cardsPlace);
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
            .then(() => {
                placeholder.remove();

            })
    }
}

class Card {
    constructor(book) {
        this.key = book.key;
        this.title = book.title;
        this.imgUrl = book.imgUrl;
        this.authorList = book.authorsList;
        this.class = 'card';
        this.width = '15rem'

    }

    create() {
        this.card = document.createElement('div');
        this.card.classList.add(this.class);
        this.card.style.width = this.width;

        this.card.innerHTML = ` 
        <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
        <p class="card-text overflow-auto" style="max-height: 80px" >${(this.authorList).join(', ')}</p>
        <img src="${this.imgUrl}" class="card-img-top" alt="cover">
        </div>
        `;

        cardsPlace.appendChild(this.card);
        this.card.addEventListener('click', () => this.getDescription(), { once: true })
    }
    getDescription() {

        let popup = new PopupIn();
        let popupDOM = popup.createIn(this.card)

        let searchBookProperty = new SearchParameters(this.key, '');
        let bookProprety = searchBookProperty.get();
        let printDescription = async () => {
            bookProprety = await bookProprety;
            popup.addText(bookProprety.description)

        }
        printDescription();
        this.card.addEventListener('click', () => this.switchShow(popupDOM));


    }
    switchShow(popup) {
        switch (popup.style.display) {
            case '':
                popup.style.display = 'none'
                break;
            case 'none':
                popup.style.display = ''
                break;

            default:
                break;
        }
    }

}

class PopupIn {
    constructor() {
        this.classList = ['position-absolute', 'top-0', 'start-0', 'overflow-auto', 'popup']

    }
    createIn(card) {
        this.descrDOM = document.createElement('div');
        this.descrDOM.classList.add(...this.classList);


        this.descrDOM.style.display = ''


        card.appendChild(this.descrDOM)
        return this.descrDOM

    }

    addText(description) {
        switch (typeof description) {
            case 'undefined':
                this.description = '🙄 description not available';
                break;
            case 'object':
                this.description = description.value;
                break;
            case 'string':
                this.description = description;
                break
        }
        this.descrDOM.innerHTML = this.description
    }
}

class Placeholder {
    constructor() {
        this.class = 'card';
        this.width = '15rem';
        this.innerHTML = ` 
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
        this.card = document.createElement('div');
        this.card.classList.add(this.class);
        this.card.style.width = this.width;
        this.card.innerHTML = this.innerHTML;
        await cardsPlace.appendChild(this.card);
    }
    remove() {
        this.card.remove()
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        cardsPlace.innerHTML = '';
        document.getElementById('warning').innerHTML = '';

        let placeholder = new Placeholder();
        let research = new SearchParameters(value_type(), value_search());

        placeholder.create()
            .then(() => research.get())
            .then(library => setProperty(library))
            .then(library => {
                filterReport.fill(`trovati ${library.count} libri`);
                if (!library.count) {
                    document.getElementById('warning').innerHTML = `
                    The search has no results. Try searching for a valid ${researchType[value_type()].type}
                    in the page <a href = 'https://openlibrary.org${researchType[value_type()].urlToSite}'
                    target ='_blank'> Open Library </a>`;

                    $('#btn-scroll').remove()
                } else {
                    let scrolling = new BtnScroll();
                    if ($('#btn-scroll') != null) {
                        $('#btn-scroll').remove()
                        scrolling.create()
                        $('#btn-scroll').on('click', () => scrolling.showOthers(research))
                    } else {
                        scrolling.create();
                        $('#btn-scroll').on('click', () => scrolling.showOthers(research));

                    };
                    library.forEach(book => {
                        let card = new Card(book);
                        card.create();
                    })
                }
                placeholder.remove();

            })
    }
})