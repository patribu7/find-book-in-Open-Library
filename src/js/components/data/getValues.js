// Ottengo il volare nella barra di ricerca e nell'input di selezione

const getValueSearch = function () {
    return document.getElementById('search-input').value;
}
const getValueType = function () {
    return document.getElementById('search-type').value;
}

export {  getValueSearch, getValueType }