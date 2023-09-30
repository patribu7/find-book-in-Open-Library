
import './components/data/image-component';
import './components/control/btn-component';
import '../css/style.css';
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

//----------------------------//
import { execute } from './execute';
import SearchParameters from "./components/input/search-component";
import { getValueSearch, getValueType } from './getValues';
import * as placeOf from './getPlaceOf';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let research = new SearchParameters(getValueType(), getValueSearch());
        e.preventDefault();
        execute(true, research, cf.warning, cf.cardsPlace)
    }
})

searchButton.addEventListener('click', () => {
    let research = new SearchParameters(getValueType(), getValueSearch());
    execute(true, research, placeOf.warning, placeOf.cards);

})
