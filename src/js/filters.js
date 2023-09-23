class FilterReport {
    constructor() {
        this.DOM = document.getElementById('filter-report');
    }
    fill(text) {
        this.DOM.innerHTML = text 
    }
}

const filterReport = new FilterReport()
filterReport.fill('trovati 0 libri')

export default filterReport