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

function renderLineTxtInput() {
    let elInputTxt = document.querySelector('.input-txt');
    let lineTxt = getSelectedLineTxt()
    elInputTxt.value = lineTxt
}

function renderMeme() {
    const img = getImg()
    const elImg = new Image();
    drawImg(elImg, img)
    elImg.src = img.url
    if (gMeme.lines.length) {
        renderLineTxtInput()
    }
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
        gCtx.font = `${line.size}px Impact`
        gCtx.fillText(line.txt, 40, 60)
        gCtx.strokeText(line.txt, 40, 60)
    })
}


function drawImg(elImg, img) {
    elImg.onload = () => {
        console.log(gCanvas.width, gCanvas.height);
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
    }
}
function onAddTxt() {
    _addTxt(gCtx)
}

function onDeleteTxt() {
    _deleteTxt()
    renderMeme()
}
function onIncreaseFont() {
    increaseFontSize()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFontSize() 
    renderMeme()
}


function _addTxt(ctx) {
    gMeme.lines.forEach(line => {
        ctx.fillStyle = line.color
        ctx.font = `${line.size}px Impact`
        ctx.fillText(line.txt, 40, 60)
        ctx.strokeText(line.txt, 40, 60)
    })
}

function _deleteTxt() {
    drawText('')
}
