// Ottiene il volare della barra di ricerca e dell'input di selezione

const getValueSearch = function () {
    return document.getElementById('search-input').value;
}
const getValueType = function () {
    return document.getElementById('search-type').value;
}

export {  getValueSearch, getValueType }