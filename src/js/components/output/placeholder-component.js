// loading di caricamento
export default class Placeholder {
    constructor() {
        this.class = 'card';
        this.width = '15rem';
        this.innerHTML = ` 
        <div class="card-body">
          <h5 class="card-title placeholder-glow"><span class="placeholder col-6"></span></h5>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-4"></span>
            <span class="placeholder col-7"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-3"></span>
          </p>
          <div class="placeholder-wave card-img-bottom" style="width: 100%; height: 230px; background-color: gray;" alt="..."></div>
        </div>
        `;
    }
    createIn(place) {
        this.card = document.createElement('div');
        this.card.classList.add(this.class);
        this.card.style.width = this.width;
        this.card.innerHTML = this.innerHTML;
        place.appendChild(this.card);
    }
    remove() {
        this.card.remove()
    }
}