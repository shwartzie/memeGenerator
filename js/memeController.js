'use strict'


let gCanvas
let gCtx
let gCurrTxt
const gRefresh = {
    touchStart: 0,
    touchEnd: 0,
}
const MEME_KEY = 'memeDB'

function onInit() {
    
    onSearchByKeywords()
    _initMeme()
    document.querySelector('.no-imgs-found').hidden = true
}

function _initMeme() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderImgs()
}

function onMainPage() {
    const savedMemes = document.querySelector('.saved-memes-container')
    const elMainPageContainer = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor-section')
    const elSearchBar = document.querySelector('.line-txt')
    const elNavBar = document.querySelector('.nav-gallery')
    const elMainPage = document.querySelector('.gallery-section')
    const elSearchByKeys = document.querySelector('.search-by-keyword')
    document.querySelector('.about').hidden = true
    const elAbout = document.querySelector('.btn-about')
    elAbout.classList.remove('active')
    document.querySelector('.no-imgs-found').hidden = true
    elNavBar.classList.remove('active')
    savedMemes.style.display = 'none'
    elSearchByKeys.style.display = 'block'
    elMainPageContainer.style.display = 'flex'
    elEditor.style.display = 'none'
    elSearchBar.style.display = 'inline-block'
    elMainPage.style.display = 'grid'
    renderImgs()
    
}

function imgClicked() {
    const editor = document.querySelector('.editor-section')
    const gallery = document.querySelector('.gallery-container')
    const filter = document.querySelector('.line-txt')
    const mainPageElBtn = document.querySelector('.nav-main-page')
    mainPageElBtn.classList.toggle('active')
    filter.style.display = 'none'
    gallery.style.display = 'none'
    editor.style.display = 'flex'
}

function renderImgs(imgs = gImgs, selector = 'gallery-section') {
    if (!imgs) {
        imgs = gImgs
    }
    let strHTMLs = imgs.map(img => {
        return `
        <div>
            <img onclick="onStartMeme(${img.id})" class="img img-${img.id}" 
            src="meme-imgs/${img.id}.jpg" alt="">
        </div>
        `
    })
    let elGallerySection = document.querySelector(`.${selector}`);
    elGallerySection.innerHTML = strHTMLs.join('')
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
        let fontStyle = `${line.size}px ${line.font}`
        let align = `${line.align}`
        drawText(line.txt, line.color, line.strokeColor, fontStyle, align, line.pos.x, line.pos.y)
        if (idx === gMeme.selectedLineIdx) {
            markLine(line)
        }
    })
}

//render canvas
function drawText(txt, lineColor, lineStrokeColor, fontStyle, align, x, y) {
    //fix txt
    gCtx.textAlign = align
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = lineStrokeColor
    gCtx.fillStyle = lineColor
    gCtx.font = fontStyle
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function drawImg(elImg) {
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
        drawLines()
    }
}

//btns on editor
function onAddTxt() {
    addTxt()
    _renderMeme()
}

function onDeleteTxt() {
    const line = getSelectedLine()
    if (!line) {
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

// function onChangeInput() {
//     const elInput = document.querySelector('.input-txt')
//     console.log(gMeme.lines[gMeme.selectedLineIdx]);
//     // elInput.value = getCurrTxt()
// }
function getCurrTxt() {
    if (!gMeme.lines.length) {
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
    _renderMeme()
    // onChangeInput()
}

function markLine(line) {
    gCtx.globalCompositeOperation = "multiply"
    gCtx.rect(0, line.pos.y + line.size / 8, gCanvas.width, -line.size)
    gCtx.strokeStyle = '#888'
    gCtx.stroke();
    gCtx.fillStyle = "#ddd"
    gCtx.fillRect(0, line.pos.y + line.size / 8, gCanvas.width, -line.size)
    gCtx.globalCompositeOperation = "source-over"
}

function onSaveMeme() {
    saveMeme()
}

function onDownload(elLink) {
    downloadMeme(elLink)
}

function onShareMeme() {
    shareMeme()
}

function onFilterImgByTxt(txt) {
    const imgs = filterImgByTxt(txt)
    const errMsg = document.querySelector('.nothing-found')
    const gallery = document.querySelector('.gallery-section')
    if (!imgs) {
        errMsg.style.display = 'block'
        gallery.style.display = 'none'
    }
    if (!txt) {
        errMsg.style.display = 'none'
        gallery.style.display = 'grid'
    }
    
    renderImgs(imgs)
}

function onSetLang(lang) {
    setLang(lang)
    if (lang === "he") document.body.classList.add("rtl")
    else document.body.classList.remove("rtl")
    doTrans()
    renderImgs()
    _renderMeme()
}


function onSearchByKeywords() {
    const keywords = searchByKeywords()
    renderKeyWords(keywords)
}

function renderKeyWords(words) {
    let strHTMLs = words.map((word) => {
        return `<li><button data-trans="${word}" class="word" onclick="countWords(this)">${word}</button></li>`
    })
    const elSearchKeywords = document.querySelector('.search-by-keyword ul')
    elSearchKeywords.innerHTML = strHTMLs.join('')
}
