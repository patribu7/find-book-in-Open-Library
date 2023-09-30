// il report di quenti libri totali si son trovati interrogando le API
class FilterReport {
    constructor() {
        this.DOM = document.getElementById('filter-report');
    }
    print(text) {
        this.DOM.innerHTML = text 
    }
}

const report = new FilterReport()
report.print('trovati 0 libri') //cancalla



export {report}