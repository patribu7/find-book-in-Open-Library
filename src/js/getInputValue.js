const search = document.getElementById('search-input');
const type =  document.getElementById('search-type');
const report = document.getElementById('filter-report');
const cardsPlace = document.getElementById('cards-place');
filterReport.innerHTML = `trovati 0 libri`;

let searchValue = search.value;
let typeValue = type.value

export default { searchValue, typeValue, report, cardsPlace }

