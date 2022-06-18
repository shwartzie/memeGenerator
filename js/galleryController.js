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
    const savedMemes = document.querySelector('.saved-memes-container')
    savedMemes.style.display = 'grid'
    const elNav = document.querySelector('.nav-main-page')
    const elMainPageContainer = document.querySelector('.gallery-container')
    const elMainPage = document.querySelector('.gallery-section')
    const elEditor = document.querySelector('.editor-section')
    const elSearchBar = document.querySelector('.line-txt')
    const elSearchByKeys = document.querySelector('.search-by-keyword')
    const elAbout = document.querySelector('.btn-about')
    elAbout.classList.remove('active')
    document.querySelector('.about').hidden = true
    document.querySelector('.no-imgs-found').hidden = true
    elMainPageContainer.style.display = 'flex'
    elNav.classList.remove('active')
    elMainPage.style.display = 'none'
    elSearchBar.style.display = 'none'
    elEditor.style.display = 'none'
    elSearchByKeys.style.display = 'none'
}