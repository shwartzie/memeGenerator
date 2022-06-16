'use strict'

const gKeywordSearchCountMap = {
    'funny': 12,
    'cat': 16,
    'baby': 2
}

const gImgs = [
    {
        id: 1, url: 'meme-imgs/1.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 2, url: 'meme-imgs/2.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 3, url: 'meme-imgs/3.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 4, url: 'meme-imgs/4.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 5, url: 'meme-imgs/5.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 6, url: 'meme-imgs/6.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 7, url: 'meme-imgs/7.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 8, url: 'meme-imgs/8.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 9, url: 'meme-imgs/9.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 10, url: 'meme-imgs/10.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 11, url: 'meme-imgs/11.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 12, url: 'meme-imgs/12.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 13, url: 'meme-imgs/13.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 14, url: 'meme-imgs/14.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 15, url: 'meme-imgs/15.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 16, url: 'meme-imgs/16.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 17, url: 'meme-imgs/17.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 18, url: 'meme-imgs/18.jpg',
        keywords: ['funny', 'cat']
    },
    
]
let gMeme = createMeme()


function createMeme(imgId = 1) {
    let meme = {
        id: makeId(),
        selectedImgId: imgId,
        selectedLineIdx: 0,
        selectedFont: 'Impact',
        lines: [createLine()]
    }
    return meme
}
function createLine() {
    let line = {
        txt: 'asdfasdfasdfas',
        size: 35,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        pos: {x: 50, y:getRandomIntInclusive(50, 300)},
        font: 'Impact'
    }
    return line
}
const gFilterBy = {
    txt: ''
}

function getImg() {
    let imgId = gMeme.selectedImgId
    let img = getImgById(imgId)
    return img
}
function getImgById(imgId) {
    let img = gImgs.find((Img) => {
        return imgId === Img.id
    })
    return img
}

function getMeme() {
    return gMeme
}
function setNewgMeme(imgId) {
    gMeme = createMeme(imgId)
}

function setLineTxt(txt) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    _renderMeme()
    let fontSize = `${line.size}px Impact`
    line.txt = txt
    drawText(txt, line.color, line.strokeColor, fontSize, line.pos.x, line.pos.y)
}

function toggleLine() {
    gMeme.selectedLineIdx + 1 > gMeme.lines.length ? (gMeme.selectedLineIdx = 0) : (gMeme.selectedLineIdx += 1)
}

function increaseFontSize() {
    const line = getSelectedLine()
    line.size++
}

function decreaseFontSize() {
    const line = getSelectedLine()
    line.size--
}
function getSelectedLineTxt() {
    let selectedLineIdx = gMeme.selectedLineIdx
    let lineTxt = gMeme.lines[selectedLineIdx].txt
    return lineTxt
}

function getSelectedLine() {
    let lineIdx = gMeme.selectedLineIdx
    let selectedLine = gMeme.lines[lineIdx]
    return selectedLine
}

function selectClickedLine({ offsetX, offsetY }) {
    gMeme.lines.forEach((line, idx) => {
        if (offsetY < line.pos.y & offsetY > line.pos.y - line.size) {
            gMeme.selectedLineIdx = idx
        }
    })
}
function addTxt() {
    let lines = gMeme.lines
    let lineLeng = lines.length
    let line = createLine()
    let linePosY;

    if (lineLeng === 0) {
        linePosY = line.size
    } else if (lineLeng === 1) {
        linePosY = gCanvas.height - line.size
    } else {
        linePosY = lineLeng * line.size
    }

    line['pos'] = { x: gCanvas.width / 2, y: linePosY }
    lines.push(line)
    changeToNewLine()
}

function alignTxtLeft() {
    gMeme.lines[gMeme.selectedLineIdx].x = 10
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}

function alignTxtCenter() {
    gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width / 2
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
}

function alignTxtRight() {
    gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width - 10
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'
}

function changeToNewLine() {
    let Linesleng = gMeme.lines.length
    gMeme.selectedLineIdx = Linesleng - 1
}

function setFontStyle(font) {
    gMeme.selectedFont = font
    updateFont(gMeme.selectedFont)
}


