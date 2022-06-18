'use strict'


function onAbout() {
    document.querySelector('.about').hidden = false
    const elNav = document.querySelector('.nav-main-page')
    const elMainPageContainer = document.querySelector('.gallery-container')
    const elMainPage = document.querySelector('.gallery-section')
    const elEditor = document.querySelector('.editor-section')
    const elSearchBar = document.querySelector('.line-txt')
    const elSearchByKeys = document.querySelector('.search-by-keyword')
    const elGalleryBtn = document.querySelector('.btn-gallery')
    
    elGalleryBtn.classList.remove('active')
    document.querySelector('.no-imgs-found').hidden = true
    elMainPageContainer.style.display = 'none'
    elNav.classList.remove('active')
    elMainPage.style.display = 'none'
    elSearchBar.style.display = 'none'
    elEditor.style.display = 'none'
    elSearchByKeys.style.display = 'none'
}