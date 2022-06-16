'use strict'


let gCanvas
let gCtx
let gCurrTxt

function onInit() {
    initGallery()
    _initMeme()
}

function _initMeme() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
}


function _renderLineTxtInput() {
    let elInputTxt = document.querySelector('.input-txt');
    let lineTxt = getSelectedLineTxt()
    elInputTxt.value = lineTxt
}
function onToggleBtnActive(btnClass) {
    btnClass.classList.toggle('active')
}
function _resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}
function onClearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function _renderMeme() {
    const img = getImg()
    const elImg = new Image();
    drawImg(elImg, img)
    elImg.src = img.url
    if (gMeme.lines.length) {
        _renderLineTxtInput()
    }
    _resizeCanvas()
}
function onStartMeme(imgId) {
    setNewgMeme(imgId)
    imgClicked()
    _renderMeme()
}

function drawLines() {
    let lines = gMeme.lines
    lines.forEach((line, idx) => {
        let fontStyle = `${line.size}px Impact`
        drawText(line.txt, line.color, line.strokeColor, fontStyle, line.pos.x, line.pos.y)
    })
}

//render canvas
function drawText(txt, lineColor, lineStrokeColor, fontStyle, x, y) {
    //fix txt
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = lineStrokeColor
    gCtx.fillStyle = lineColor
    gCtx.font = fontStyle
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function drawImg(elImg, img) {
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
        drawLines()
    }
}
//btns on editor
function onAddTxt() {
    addTxt(gCtx)
    _renderMeme()
}

function onDeleteTxt() {
    const line = getSelectedLine()
    if(!line) {
        return
    }
    _deleteTxt()
    _renderMeme()
}
function onIncreaseFont() {
    increaseFontSize()
    _renderMeme()
}

function onDecreaseFont() {
    decreaseFontSize()
    _renderMeme()
}

function onChangeInput() {
    const elInput = document.querySelector('.input-txt')
    console.log(gMeme.lines[gMeme.selectedLineIdx]);
    // elInput.value = getCurrTxt()
}
function getCurrTxt() {
    if(!gMeme.lines.length) {
        return ''
    }
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function _deleteTxt() {
    const line = getSelectedLine()
    
    line.txt = ''
    drawText('')
    _renderMeme()
}

//Align txt on canvas

function onAlignLeft() {
    alignTxtLeft()
    _renderMeme()
}

function onAlignCenter() {
    alignTxtCenter()
    _renderMeme()
}


function onAlignRight() {
    alignTxtRight()
    _renderMeme()
}

function onSetFontStyle(font) {
    setFontStyle(font)
}

function updateFont(font) {
    const line = getSelectedLine()
    line.font = `${font.value}`
    let fontStyle = `${line.size}px ${font.value}`
    drawText(line.txt, line.color, line.strokeColor, fontStyle, line.pos.x, line.pos.y)
    _renderMeme()
}

function onChangeFontColor(color) {
    changeColor(color)
}

function changeColor(color) {
    const line = getSelectedLine()
    line.color = `${color.value}`
    drawText(line.txt, color, line.strokeColor, line.font, line.pos.x, line.pos.y)
    _renderMeme()
}

function onToggleLine() {
    if (gMeme.lines.length < 2) {
        return
    }
    toggleLine()
    onChangeInput()
}


