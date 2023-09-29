const cardsPlace = document.getElementById('cards-place');

const getValueSearch = function() {
    return document.getElementById('search-input').value;
}
const getValueType = function() {
    return document.getElementById('search-type').value;
}

const researchType = {
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
        type: 'general search', urlToSite: '/search?q='
    }
}


export { cardsPlace, getValueSearch, getValueType, researchType }