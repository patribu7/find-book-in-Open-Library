export default class SearchParameters {
    constructor(type, search) {

        if (type.includes('json')) {

            this.search = search.replace(' ', '+');
            this.separator = '&';
        } else {
            this.search = search.replace(' ', '_') + '.json';
            this.separator = '?'
        }
        this.type = type;

        this.limit = 10;
        this.offset = 0;

    }
    async get() {
        this.url = process.env.URL_SITE + this.type + this.search.toLowerCase() + this.separator + 'limit=' + this.limit + '&offset=' + this.offset;
        console.log(this.url)
        const response = await fetch(this.url);
        const json = await response.json();

        return json
    }
}