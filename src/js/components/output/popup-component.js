import SearchParameters from "../input/search-component";
// Il popup contentuto in card con la descrizione del libro
export class Popup {
    constructor() {
        this.classList = ['position-absolute', 'top-0', 'start-0', 'overflow-auto', 'popup']

    }
    createIn(card) {
        this.descrDOM = document.createElement('div');
        this.descrDOM.classList.add(...this.classList);
        this.descrDOM.style.display = ''

        card.appendChild(this.descrDOM)
        return this.descrDOM
    }
    addText(description) {
        switch (typeof description) {
            case 'undefined':
                this.description = '🙄 description not available';
                break;
            case 'object':
                this.description = description.value;
                break;
            case 'string':
                this.description = description;
                break
        }
        this.descrDOM.innerHTML = this.description
    }
}
