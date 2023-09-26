
import './image-component';
import './component';


import '../css/style.css';

// Import our custom CSS
import '../scss/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';









// esempi per importare solo alcuni moduli da bootstrap

// import Alert from 'bootstrap/js/dist/alert';

// // or, specify which plugins you need:
// import { Tooltip, Toast, Popover } from 'bootstrap'


//----------------------------//
import filterReport from "./filters";
import { value_search, value_type } from "./getInputValue";
import researchType from './researchType';
import { SearchParameters, setProperty, BtnScroll, Card, Placeholder } from "./component";

const cardsPlace = document.getElementById('cards-place');
const warning = document.getElementById('warning');

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        cardsPlace.innerHTML = '';
        warning.innerHTML = '';

        let placeholder = new Placeholder();
        let research = new SearchParameters(value_type(), value_search());
        filterReport.fill(`trovati 0 libri`);
        placeholder.create()
            .then(() => research.get())
            .then(library => setProperty(library))
            .then(library => {
                filterReport.fill(`trovati ${library.count} libri`);
                if (!library.count) {
                    warning.innerHTML = `
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