import * as filter from "./components/control/filters-component";
import replaceButton from "./components/control/btn-component";
import setProperty from "./components/data/setProperty";
import { Card } from './components/output/card-component';
import Placeholder from "./components/output/placeholder-component";

export function execute(isFirstSearch, research, warning, placeForCards) {
    if (isFirstSearch) {
        placeForCards.reset();
        warning.reset();
        filter.report.reset();
    }
    let placeholder = new Placeholder();
    placeholder.createIn(placeForCards.DOM)

    research.get()
        .then(library => setProperty(library))
        .then(library => {
            if (isFirstSearch) {
                filter.report.print(library.count);

                if (!library.count) {
                    warning.print()
                };
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