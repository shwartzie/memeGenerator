'use strict'


let gCanvas
let gCtx
let gCurrTxt
let gStartPos
const gRefresh = {
    touchStart: 0,
    touchEnd: 0,
}
const MEME_KEY = 'memeDB'

function onInit() {
    _initMeme()
    onSearchByKeywords()
    checkViewPort()
}

function _initMeme() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderImgs()
    addMouseListeners()
    document.querySelector('.no-imgs-found').hidden = true
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
    _resizeCanvas()
    mainPageElBtn.classList.toggle('active')
    filter.style.display = 'none'
    gallery.style.display = 'none'
    editor.style.display = 'flex'
}

function onToggleBtnActive(btnClass) {
    btnClass.classList.toggle('active')
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

function _renderMeme() {
    const meme = getMeme()
    const imgId = meme.selectedImgId
    const elImg = new Image();
    drawImg(elImg, imgId)
    elImg.src = `meme-imgs/${imgId}.jpg`
    if (meme.lines.length) {
        _renderLineTxtInput()
    }
}

function onStartMeme(imgId) {
    changeMemeImgId(imgId)
    imgClicked()
    _renderMeme()
}

//render canvas
function drawText(txt, lineColor, lineStrokeColor, fontStyle, align, x, y) {
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

function drawLines() {
    const meme = getMeme()
    let lines = meme.lines
    lines.forEach((line, idx) => {
        let fontStyle = `${line.size}px ${line.font}`
        let align = `${line.align}`
        drawText(line.txt, line.color, line.strokeColor, fontStyle, align, line.pos.x, line.pos.y)
        if (idx === meme.selectedLineIdx) {
            markLine(line)
        }
    })
}

function _resizeCanvas() {
    gCanvas.width = 476
    gCanvas.height = 546
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}


//EDITOR FUNCTIONS - START
function setLineTxt(txt) {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    let fontSize = `${line.size}px Impact`
    changeLineTxt(line, txt)
    drawText(txt, line.color, line.strokeColor, fontSize, line.pos.x, line.pos.y)
    _renderMeme()
}

function onAddTxt() {
    addTxt()
    _renderMeme()
}

function onDeleteTxt() {
    const line = getSelectedLine()
    if (!line) {
        return
    }
    deleteTxt()
    // txt, lineColor, lineStrokeColor, fontStyle, align, x, y
    drawLines()
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
    drawText(line.txt, color, line.strokeColor, line.font, line.pos.x, line.pos.y)
    _renderMeme()
}



function onToggleLine() {
    const meme = getMeme()
    if (meme.lines.length < 2) {
        return
    }
    toggleLine()
    _renderMeme()
}

function markLine(line) {
    gCtx.globalCompositeOperation = "multiply"
    gCtx.rect(0, line.pos.y + line.size / 8, gCanvas.width, - line.size)
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

//EDITOR FUNCTIONS - END

//Filters

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

function onSearchByKeywords() {
    const keywords = searchByKeywords()
    renderKeyWords(keywords)
}

function renderKeyWords(words) {
    let strHTMLs = words.map((word) => {
        if (word === 'all') {
            return `<li><button data-trans="${word}" class="word" onclick="renderImgs()">${word}</button></li>`
        }
        return `<li><button data-trans="${word}" class="word" onclick="countWords(this)">${word}</button></li>`
    })
    const elSearchKeywords = document.querySelector('.search-by-keyword ul')
    elSearchKeywords.innerHTML = strHTMLs.join('')
}

//DRAGGING
function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}
function onDown(ev) {
    const pos = getEvPos(ev)
    checkPos(pos)
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

//fix 
function onMove(ev) {
    const line = getSelectedLine()
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(line, dx, dy)
        gStartPos = pos
        _renderMeme()
    }
}

function checkPos(pos) {
    const meme = getMeme()
    const lineIdx = meme.lines.findIndex(line => line.pos.y <= pos.y + 20 && line.pos.y >= pos.y);
    if (lineIdx > -1 && meme.selectedLineIdx !== lineIdx) {
        meme.selectedLineIdx = lineIdx
        markLine(meme.lines[lineIdx])
        drawLines()
        _renderMeme()
    }
}

//Translation

function onSetLang(lang) {
    setLang(lang)
    if (lang === "he") document.body.classList.add("rtl")
    else document.body.classList.remove("rtl")
    doTrans()
    renderImgs()
    _renderMeme()
}

function checkViewPort() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    if(vw <= 680) {
        resizeCanvasOnMobile()
    }
}

function resizeCanvasOnMobile () {
    const elContainer = document.querySelector('#my-canvas')
    const size = calculateAspectRatioFit(
        250,
        250,
        250,
        250
    );
    elContainer.width = size.width
    elContainer.height = size.height
};

