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

