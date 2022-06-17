'use strict'



//saved gallery
function onGallery() {
    resetPage()

    const galleryPage = document.querySelector('.saved-memes-container')
    galleryPage.style.display = 'grid'

    renderSavedMemes()
}

function renderSavedMemes() {
    const imgs = getSavedMemes()
    if(!imgs) {
        document.querySelector('.no-imgs-found').hidden = false
    } else {
        document.querySelector('.no-imgs-found').hidden = true
        renderImgs(imgs, 'saved-memes-container')
    }
}

function resetPage() {
    //resets
    const mainPageElBtn = document.querySelector('.nav-main-page')
    const mainPage = document.querySelector('.gallery-section')
    const container = document.querySelector('.gallery-container')
    const editor = document.querySelector('.editor-section')
    const searchBar = document.querySelector('.line-txt')
    document.querySelector('.no-imgs-found').hidden = true
    container.style.display = 'flex'
    mainPageElBtn.classList.remove('active')
    mainPage.style.display = 'none'
    searchBar.style.display = 'none'
    editor.style.display = 'none'
}