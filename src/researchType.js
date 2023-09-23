// qui le variabili globali

// const getDOM = {
//     searchInput: document.getElementById('search-input'),
//     searchSelectType: document.getElementById('search-type'),
//     cardsPlace: document.getElementById('cards-place'),
//     filterReport: document.getElementById('filter-report'),
// };

// getDOM.filterReport.innerHTML = `trovati 0 libri`;


export default {
    'subject': '/subjects/',
    'title': '/search.json?title=',
    'authors': '/search/authors.json?q=',
    'general': '/search.json?q=',

    '/subjects/': {
        type: 'subjects', urlToSite: '/subjects/'
    },
    '/search.json?title=': {
        type: 'title', urlToSite: '/search?title='
    },
    '/search/authors.json?q=': {
        type: 'authors', urlToSite: '/search/authors?q='
    },
    '/search.json?q=': {
        type: 'general', urlToSite: '/search?q='
    }
}

