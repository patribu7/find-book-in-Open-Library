
import './components/image-component';
import './components/btn-component';
import '../css/style.css';
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

//----------------------------//
import { executeSearch } from './execute';
import SearchParameters from "./components/search-component";
import * as cf from './config';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        let research = new SearchParameters(cf.value_type(), cf.value_search());
        e.preventDefault();
        executeSearch(true, research)
    }
})

searchButton.addEventListener('click', () => {
    let research = new SearchParameters(cf.value_type(), cf.value_search());
    executeSearch(true, research);

})
