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
        txt: '"Type Something"',
        size: 35,
        align: 'center',
        color: 'white',
        strokeColor: 'black'
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

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function setNewgMeme(imgId) {
    gMeme = createMeme(imgId)
}



function setLineTxt(txt) {
    drawText(txt)
}

function toggleLine() {
    let linesLen = gMeme.lines.length
    let selectedLineIdx = gMeme.selectedLineIdx
    gMeme.selectedLineIdx = (selectedLineIdx + 1 === linesLen) ? 0 : selectedLineIdx + 1
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