const cardsPlace = document.getElementById('cards-place');

const value_search = function() {
    return document.getElementById('search-input').value;
}
const value_type = function() {
    return document.getElementById('search-type').value;
}
export { cardsPlace, value_search, value_type }