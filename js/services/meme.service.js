'use strict'


const gKeywordSearchCountMap = {
    'all': null,
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

let gMeme = {
    id: makeId(),
    selectedImgId: 1,
    selectedLineIdx: 0,
    selectedFont: 'Impact',
    lines: [{
        txt: 'asdfasdfasdfas',
        size: 35,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        pos: { x: 220, y: 60},
        font: 'Impact',
        isDrag: false
    }]
}

const imgsStorage = []

//GETTERS 
function getMeme() {
    return gMeme
}

function getImg() {
    const meme = getMeme()
    let imgId = meme.selectedImgId
    let img = getImgById(imgId)
    return img
}

function getImgById(imgId) {
    let img = gImgs.find((Img) => {
        return imgId === Img.id
    })
    return img
}
function getSelectedLineTxt() {
    const meme = getMeme()
    // if(!meme.selectedLineIdx) {
    //     meme.selectedLineIdx = 0
    // }
    let selectedLineIdx = meme.selectedLineIdx
    let lineTxt = meme.lines[selectedLineIdx].txt
    return lineTxt
}

function getSelectedLine() {
    const meme = getMeme()
    let lineIdx = meme.selectedLineIdx
    let selectedLine = meme.lines[lineIdx]
    return selectedLine
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

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos
}

function changeLineTxt(line ,txt) {
    line.txt = txt
}

function toggleLine() {
    const meme = getMeme()
    let linesLen = meme.lines.length
    let selectedLineIdx = meme.selectedLineIdx
    meme.selectedLineIdx = (selectedLineIdx + 1 === linesLen) ? 0 : selectedLineIdx + 1
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

function createLine(height) {
    return {
        txt: 'asdfasdfasdfas',
        size: 35,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        pos: { x: 220, y: height},
        font: 'Impact',
        isDrag: false
    }
}
function addTxt() {
    const meme = getMeme()
    let lines = meme.lines
    let lineLeng = lines.length
    let line
    console.log(lines);
    if (lineLeng === 1) {
        line = createLine(450)
    } else {
        line = createLine(250)
    }

    line.pos = { x: gCanvas.width / 2, y: line.pos.y }
    lines.push(line)
    drawLines()
    changeToNewLine()
}

function alignTxtLeft() {
    const line = getSelectedLine()
    line.align = 'right'
}

function alignTxtCenter() {
    const line = getSelectedLine()
    line.align = 'center'
}

function alignTxtRight() {
    const line = getSelectedLine()
    line.align = 'left'
}

function changeToNewLine() {
    const meme = getMeme()
    let linesLeng = meme.lines.length
    meme.selectedLineIdx = linesLeng - 1
}

function setFontStyle(font) {
    const meme = getMeme()
    meme.selectedFont = font
    updateFont(meme.selectedFont)
}

function filterImgByTxt(txt) {
    if(!txt) {
        return null
    }
    return _getImgsByFilter(txt)
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
    elDownload.download = `${img.url}`
    const imgContent = gCanvas.toDataURL(`${img.url}`)
    elLink.href = imgContent
}

function shareMeme() {
    const imgDataUrl = gCanvas.toDataURL(`image/jpeg`)
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`);
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
            onSuccess(url)
        })
        .catch((err) => {
            throw new Error(`the url - ${url} is not good, the error is ${err}`)
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
    if(gKeywordSearchCountMap[`${elBtn.innerText}`] > 22) {
        gKeywordSearchCountMap[`${elBtn.innerText}`] = 22
    }
    const val = gKeywordSearchCountMap[`${elBtn.innerText}`]
    elBtn.style.fontSize = `${val}px`
    onFilterImgByTxt(elBtn.innerText)
}



function setLineDrag(isDrag) {
    const line = getSelectedLine()
    line.isDrag = isDrag
}
function moveLine(line,dx, dy) {
    line.pos.x += dx
    line.pos.y += dy
}

function getCurrTxt() {
    const meme = getMeme()
    if (!meme.lines.length) {
        return ''
    }
    return meme.lines[meme.selectedLineIdx].txt
}

function deleteTxt() {
    const meme = getMeme()
    meme.lines.splice(meme.selectedLineIdx, 1)
}

function changeColor(color) {
    const line = getSelectedLine()
    line.color = `${color.value}`
    
}

function changeMemeImgId(imgId) {
    const meme = getMeme()
    meme.selectedImgId = imgId
}

const calculateAspectRatioFit = function (
    srcWidth,
    srcHeight,
    maxWidth,
    maxHeight
  ) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  
    return {
      width: srcWidth * ratio,
      height: srcHeight * ratio
    };
  };

//   var $canvas = $(canvas);
// var $container = $(".container");

