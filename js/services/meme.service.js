'use strict'


const gKeywordSearchCountMap = {
    'funny': 14,
    'cat': 14,
    'baby': 14,
    'president': 14,
    'cute': 14,
    // 'dog': 14,
    // 'kiss': 14,
    // 'sleep': 14,
    // 'think': 14,
    // 'explain': 14,
    // 'suprised': 14,
    // 'shocked': 14,
    // 'smile': 14,
    // 'sneaky': 14,
    // 'laugh': 14,
    // 'hug': 14,
    // 'close': 14,
    // 'you': 14,
    // 'point': 14,
    // 'glass': 14,
    // 'wine': 14,
    // 'matrix':14,
    // 'cool': 14,
    // 'glasses': 14,
    // 'buzz':14,
    // 'sad': 14

}

const gImgs = [
    {
        id: 1, url: 'meme-imgs/1.jpg',
        keywords: ['president', 'funny']
    },
    {
        id: 2, url: 'meme-imgs/2.jpg',
        keywords: ['cute', 'dog', 'kiss']
    },
    {
        id: 3, url: 'meme-imgs/3.jpg',
        keywords: ['baby', 'dog']
    },
    {
        id: 4, url: 'meme-imgs/4.jpg',
        keywords: ['sleep', 'cat']
    },
    {
        id: 5, url: 'meme-imgs/5.jpg',
        keywords: ['baby', 'funny']
    },
    {
        id: 6, url: 'meme-imgs/6.jpg',
        keywords: ['think', 'explain']
    },
    {
        id: 7, url: 'meme-imgs/7.jpg',
        keywords: ['baby', 'funny', 'suprised', 'shocked']
    },
    {
        id: 8, url: 'meme-imgs/8.jpg',
        keywords: ['dont you say', 'no way', 'smile']
    },
    {
        id: 9, url: 'meme-imgs/9.jpg',
        keywords: ['baby', 'sneaky']
    },
    {
        id: 10, url: 'meme-imgs/10.jpg',
        keywords: ['laugh', 'president']
    },
    {
        id: 11, url: 'meme-imgs/11.jpg',
        keywords: ['hug', 'close']
    },
    {
        id: 12, url: 'meme-imgs/12.jpg',
        keywords: ['you', 'point']
    },
    {
        id: 13, url: 'meme-imgs/13.jpg',
        keywords: ['glass', 'wine', 'point']
    },
    {
        id: 14, url: 'meme-imgs/14.jpg',
        keywords: ['matrix', 'glasses', 'cool']
    },
    {
        id: 15, url: 'meme-imgs/15.jpg',
        keywords: ['excatly', 'now', 'point']
    },
    {
        id: 16, url: 'meme-imgs/16.jpg',
        keywords: ['facepalm', 'no way', 'laugh']
    },
    {
        id: 17, url: 'meme-imgs/17.jpg',
        keywords: ['dueses', 'president', 'putin']
    },
    {
        id: 18, url: 'meme-imgs/18.jpg',
        keywords: ['buzz', 'toy story', 'look', 'sad', 'worry']
    },

]
let gMeme = createMeme()

const imgsStorage = []

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
        pos: { x: 220, y: getRandomIntInclusive(50, 300) },
        font: 'Impact'
    }
    return line
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
    let fontSize = `${line.size}px Impact`
    line.txt = txt
    drawText(txt, line.color, line.strokeColor, fontSize, line.pos.x, line.pos.y)
    _renderMeme()
}

function toggleLine() {
    let linesLen = gMeme.lines.length
    let selectedLineIdx = gMeme.selectedLineIdx
    gMeme.selectedLineIdx = (selectedLineIdx + 1 === linesLen) ? 0 : selectedLineIdx + 1
    drawLines()
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
    drawLines()
    changeToNewLine()
}

function alignTxtLeft() {
    //mirrored canvas dont jugde me 😭
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'
}

function alignTxtCenter() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
}

function alignTxtRight() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}

function changeToNewLine() {
    let linesLeng = gMeme.lines.length
    gMeme.selectedLineIdx = linesLeng - 1
}

function setFontStyle(font) {
    gMeme.selectedFont = font
    updateFont(gMeme.selectedFont)
}

function filterImgByTxt(txt) {
    if(!txt) {
        return null
    }
    return _getImgsByFilter(txt)
}

function _getImgsByFilter(txt) {
    const imgs = gImgs.filter((img) => {
            return img.keywords.includes(txt)
    })
    if (!imgs.length) {
        return null
    }
    return imgs
}

function saveMeme() {
    const img = getImg()
    imgsStorage.unshift(img)
    _saveMemeToStorage()
}

function _saveMemeToStorage() {
    saveToStorage(MEME_KEY, imgsStorage)
}

function loadMemeFromStorage() {
    return loadFromStorage(MEME_KEY)
}

function downloadMeme(elLink) {
    const elDownload = document.querySelector('.download')
    const img = getImg()
    console.log(img, elLink);
    elDownload.download = `${img.url}`
    const imgContent = gCanvas.toDataURL(`${img.url}`)
    elLink.href = imgContent
}

function shareMeme() {
    const img = getImg()
    const imgDataUrl = gCanvas.toDataURL(`image/jpeg`)
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`);
        // const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        // console.log(encodedUploadedImgUrl);
        // document.querySelector('.share-container').innerHTML = `
        // <a class="share" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" 
        // onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        // </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData();
    formData.append('img', imgDataUrl)
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url)
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}


function searchByKeywords() {
    const keywords = []
    for(let key in gKeywordSearchCountMap) {
        if(!keywords.includes(key)) {
            keywords.push(key)
        }
    }
    return keywords
}

function countWords(elBtn) {
    gKeywordSearchCountMap[`${elBtn.innerText}`] += 1
    const val = gKeywordSearchCountMap[`${elBtn.innerText}`]
    elBtn.style.fontSize = `${val}px`
    onFilterImgByTxt(elBtn.innerText)
}