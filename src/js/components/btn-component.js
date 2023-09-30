import { executeSearch } from "../execute";
// il bottone per lo scrolling infinito
export default class BtnScroll {
    constructor() {
        this.text = 'SHOW MORE';
        this.id = 'btn-scroll';
        this.width = '100%';

    }
    createIn(place) {
        this.btn = document.createElement('button');
        this.btn.innerHTML = this.text;
        this.btn.style.width = this.width;

        this.btn.id = this.id;
        $(this.btn).insertAfter(place);
    }
    showOthers(books) {
        books.offset = books.offset + books.limit;
        executeSearch(false, books)
    }
}

