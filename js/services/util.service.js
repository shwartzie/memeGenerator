'use strict'

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function setQueryStringParams(object) {
    const queryStringParams = `?title=&data=`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        title: queryStringParams.get('book') || '',
        minPrice: +queryStringParams.get('minPrice') || 0,
    }
    if (!filterBy.title && !filterBy.minPrice) {
        return
    }
    document.querySelector('.filter-book-select').value = filterBy.title
    document.querySelector('.filter-price-range').value = filterBy.minPrice
    _setBookFilter(filterBy)
}

function sortPrice(isDesc) {
    const sortDir = isDesc ? -1 : 1
    return globalObj.sort((a, b) => (a.price - b.price) * sortDir)
}

function sortByName(isDesc) {
    const sortDir = isDesc ? -1 : 1
    if (value === 'name') {
    return books.sort((book1, book2) => book1.name.localeCompare(book2.name) * sortDir)
}
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}












