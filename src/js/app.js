
import './components/image-component';
import './components/btn-component';
import '../css/style.css';
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

//----------------------------//
import { executeSearch } from './execute';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        executeSearch()
    }
})

searchButton.addEventListener('click', () =>
    executeSearch())