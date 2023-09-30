import SearchParameters from "../input/search-component";
// l'elemento DOM di ogni libro da visualizzare a schermo
export class Card {
    constructor(book) {
        this.key = book.key;
        this.title = book.title;
        this.imgUrl = book.imgUrl;
        this.authorList = book.authorsList;
        this.class = 'card';
        this.width = '15rem'
    }
    createIn(place) {
        this.card = document.createElement('div');
        this.card.classList.add(this.class);
        this.card.style.width = this.width;

        this.card.innerHTML = ` 
        <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
        <p class="card-text overflow-auto" style="max-height: 80px" >${(this.authorList).join(', ')}</p>
        <img src="${this.imgUrl}" class="card-img-top" alt="cover">
        </div>
        `;

        place.appendChild(this.card);
        
        this.card.addEventListener('click', () => {
            this.getDescription()
            .then(description => this.print(description))
        },
            { once: true })
    }
    async getDescription() {
        let searchBookProperty = new SearchParameters(this.key, '');
        let bookProprety = await searchBookProperty.get();
        let bookDescription = bookProprety.description;
        return bookDescription
    }
    async print(description) {        
        let popup = new PopupIn();
        let popupDOM = popup.createIn(this.card)

        popup.addText(description);
        this.card.addEventListener('click', () => this.switchShow(popupDOM));
    }
    switchShow(popup) {
        switch (popup.style.display) {
            case '':
                popup.style.display = 'none'
                break;
            case 'none':
                popup.style.display = ''
                break;

            default:
                break;
        }
    }
}

// per creare il popup contenente la descrizione in ogni card
class PopupIn {
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
