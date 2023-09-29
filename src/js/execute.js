import * as filter from "./components/filters-component";
import researchType from './researchType';
import BtnScroll from "./components/btn-component";

import setProperty from "./components/handleObj-component";
import { Card, Placeholder } from './components/DOMs-component';
import * as cf from './config';

const warning = document.getElementById('warning');


export function executeSearch(isFirstSearch, research) {
    if (isFirstSearch) {
        console.log(research)
        cf.cardsPlace.innerHTML = '';
        warning.innerHTML = '';
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
                    warning.innerHTML = `
                    The search has no results. Try searching for a valid ${researchType[cf.value_type()].type}
                    in the page <a href = 'https://openlibrary.org${researchType[cf.value_type()].urlToSite}'
                    target ='_blank'> Open Library </a>`;


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