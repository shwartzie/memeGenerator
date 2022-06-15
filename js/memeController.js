'use strict'


let gCanvas
let gCtx
let gCurrTxt

function initMeme() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    addListeners()
}

function addListeners() {
    addMouseListeners()
}


function addMouseListeners() {
    // gCanvas.addEventListener('click', onSelectedTxt)
}

// function renderLineTxtInput() {
//     let elInputTxt = document.querySelector('.input-txt');
//     // let lineTxt = getSelectedLineTxt()
//     elInputTxt.value = lineTxt
// }

function renderMeme() {
    const img = getImg()
    let elImg = new Image();
    drawImg(elImg, img)
    elImg.src = img.url
    // if (gMeme.lines.length) {
    //     renderLineTxtInput()
    // }
}
function onStartMeme(imgId) {
    setNewgMeme(imgId)
    imgClicked()
    renderMeme()
}
function onToggleLine() {
    if (!gMeme.lines.length) {
        return
    }
    toggleLine()
    renderMeme()
}

function drawText(txt) {
    gMeme.lines.forEach(line => {
        line.txt = txt
        gCtx.fillStyle = line.color
        gCtx.fillText(line.txt, 40, 60)
    })

}

function onRenderImg() {
    renderImg()
}


function drawImg(elImg, img) {
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
        onRenderImg()
    }
}
function onAddTxt() {
    addTxt(gCtx)
}

function onDeleteTxt() {
    deleteTxt(gCtx)
}
function onIncreaseFont() {
    increaseFont()
}

function onDecreaseFont() {
    decreaseFont() 
}

