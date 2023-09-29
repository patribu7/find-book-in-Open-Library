class FilterReport {
    constructor() {
        this.DOM = document.getElementById('filter-report');
    }
    fill(text) {
        this.DOM.innerHTML = text 
    }
}

const report = new FilterReport()
report.fill('trovati 0 libri')



export {report}