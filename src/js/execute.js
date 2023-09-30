import * as filter from "./components/filters-component";
import BtnScroll from "./components/btn-component";

import setProperty from "./components/handleObj-component";
import { Card, Placeholder } from './components/DOMs-component';
import * as cf from './config';




export function executeSearch(isFirstSearch, research) {
    if (isFirstSearch) {
        console.log(research)
        cf.cardsPlace.innerHTML = '';
        cf.warning.reset();
        filter.report.fill(`trovati 0 libri`);
    }
    let placeholder = new Placeholder();
    placeholder.createIn(cf.cardsPlace)

    research.get()
        .then(library => setProperty(library))
        .then(library => {
            if (isFirstSearch) {
                filter.report.fill(`trovati ${library.count} libri`);

                if (!library.count) {
                    cf.warning.print()

                };

                replaceButton(research)

            };
            replaceButton(research);


            library.forEach(book => {
                let card = new Card(book);
                card.createIn(cf.cardsPlace);
            })
        })
        .catch((error) => {

            console.error(error);
            alert('Charset not allowed');

        })
        .finally(() => placeholder.remove())
}

function replaceButton(research) {
    let scrolling = new BtnScroll();
    $('#btn-scroll').remove();
    scrolling.createIn(cf.cardsPlace);
    $('#btn-scroll').on('click', () => scrolling.showOthers(research))

}