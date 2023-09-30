import { execute } from "../../execute";
import * as placeOf from "../../getPlaceOf"

// il bottone per lo scrolling infinito
class BtnScroll {
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
        execute(false, books, placeOf.warning, placeOf.cards)
    }
}

export default function replaceButton(research) {
    let scrolling = new BtnScroll();
    $('#btn-scroll').remove();
    scrolling.createIn(placeOf.cards.DOM);
    $('#btn-scroll').on('click', () => scrolling.showOthers(research))

}