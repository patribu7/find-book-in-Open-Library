import * as filter from "./components/filters-component";
import replaceButton from "./components/btn-component";

import setProperty from "./components/handleObj-component";
import { Card, Placeholder } from './components/DOMs-component';


export function execute(isFirstSearch, research, warning, placeForCards) {
    if (isFirstSearch) {
        placeForCards.reset();
        warning.reset();
        filter.report.print(`trovati 0 libri`);
    }
    let placeholder = new Placeholder();
    placeholder.createIn(placeForCards.DOM)

    research.get()
        .then(library => setProperty(library))
        .then(library => {
            if (isFirstSearch) {
                filter.report.print(`trovati ${library.count} libri`);

                if (!library.count) {
                    warning.print()

                };

                replaceButton(research)

            };
            replaceButton(research);


            library.forEach(book => {
                let card = new Card(book);
                card.createIn(placeForCards.DOM);
            })
        })
        .catch((error) => {

            console.error(error);
            alert('Charset not allowed');

        })
        .finally(() => placeholder.remove())
}