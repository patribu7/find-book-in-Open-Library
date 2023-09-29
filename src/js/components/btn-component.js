import { Placeholder, Card } from "./DOMs-component";
import * as cf from '../config';
import setProperty from "./handleObj-component";

export default class BtnScroll {
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
        $(this.btn).insertAfter(cf.cardsPlace);
    }

    showOthers(books) {
        books.offset = books.offset + books.limit;


        let placeholder = new Placeholder();
        placeholder.create()
        books.get()

            .then(library => setProperty(library))
            .then(library => {
                library.forEach(book => {
                    let card = new Card(book);
                    card.create();
                })
            })
            .finally(() => {
                placeholder.remove();

            })
    }
}

