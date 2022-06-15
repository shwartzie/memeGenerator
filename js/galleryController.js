'use strict'

function initGallery() {
    renderImgs()
}
function renderImgs() {
    let imgs = getImgs()
    let strHTMLs = imgs.map(img => {
        return `
        <div class="meme-img" >
            <img onclick="onStartMeme(${img.id})" class="img img-${img.id}" 
            src="meme-imgs/${img.id}.jpg" alt="">
        </div>
        `
    })
    let elGallerySection = document.querySelector('.gallery-section');
    elGallerySection.innerHTML = strHTMLs.join('')
}



function imgClicked() {
    const editor = document.querySelector('.editor-section')
    const gallery = document.querySelector('.gallery-section')
    gallery.style.display = 'none'
    editor.style.display = 'flex'
}

function onMainPage() {
    const gallery = document.querySelector('.gallery-section')
    gallery.style.display = 'grid'
    const editor = document.querySelector('.editor-section')
    editor.style.display = 'none'
}


//saved gallery
function onGallery() {

}