// ottengo il contenitore dove appare il report di quanti libri totali si son trovati interrogando le API
class FilterReport {
    constructor() {
        this.DOM = document.getElementById('filter-report');
    }
    reset(){
        this.DOM.innerHTML = `trovati 0 libri`
    }

    print(text) {
        this.DOM.innerHTML = text 
    }
}

const report = new FilterReport()

export {report}