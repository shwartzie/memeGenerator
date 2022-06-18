var gTrans = {
    search: {
        en: 'Search',
        es: 'Buscar',
        he: 'חיפוש',
    },
    all: {
        en: 'All',
        es: 'Todos',
        he: 'הכל',
    },
    active: {
        en: 'Active',
        es: 'Activo',
        he: 'פעיל'
    },
    done: {
        en: 'Done',
        es: 'Completo',
        he: 'הושלם',
    },
    do: {
        en: 'Todo',
        es: 'Hacer',
        he: 'לעשות',
    },
    add: {
        en: 'Add',
        es: 'Aggregar',
        he: 'הוסף',
    },
    sure: {
        en: 'Are you sure?',
        es: 'Estas Seguru?',
        he: 'בטוח?',
    },
    startTyping: {
        en: 'Start typing...',
        he: 'תתחיל לכתוב ...'
    },
    'sort': {
        en: 'Sorting Options:',
        he: ':אופציות מיון'
    },
    id: {
        en: 'ID',
        es: 'IDENTIFICACIÓN',
        he: 'מספר סידורי'
    },
    title: {
        en: 'Title',
        es: 'Título',
        he: 'כותרת'
    },
    price: {
        en: 'Price',
        es: 'Precio',
        he: 'מחיר'
    },
    actions: {
        en: 'Actions',
        es: 'Comportamiento',
        he: 'פעולות'
    },
    read: {
        en: 'Read',
        es: 'Leer',
        he: 'תקרא'
    },
    update: {
        en: 'Update',
        es: 'Actualizar',
        he: 'תעדכן'
    },
    delete: {
        en: 'Delete',
        es: 'Borrar',
        he: 'תמחק'
    },
    prevPage: {
        en: 'Previous Page',
        es: 'Pagina anterior',
        he: 'עמוד קודם'
    },
    nextPage: {
        en: 'Next Page',
        es: 'Siguiente página',
        he: 'עמוד הבא'
    },
    rate: {
        en: 'Rate',
        es: 'Velocidad',
        he: 'דירוג'
    },
    submit: {
        en: 'Submit',
        es: 'Enviar',
        he: 'שלח'
    },
    currentPage: {
        en: 'Current Page:',
        es: 'Página actual:',
        he: ':עמוד נוכחי'
    },
    mainPage: {
        en: 'Main Page',
        he: 'עמוד ראשי'
    },
    gallery: {
        en: 'Gallery',
        he: 'גלריה'
    },
    about: {
        en: 'About',
        he: 'אודות'
    },
    share: {
        en: 'Share',
        he: 'שיתוף'
    },
    download: {
        en: 'Download',
        he: 'הורדה'
    },
    funny: {
        en: 'funny',
        he: 'מצחיק'
    },
    cute: {
        en: 'cute',
        he: 'חמוד'
    },
    president: {
        en: 'president',
        he: 'נשיא'
    },
    baby: {
        en: 'baby',
        he: 'תינוק'
    },
    cat: {
        en: 'cat',
        he: 'חתול'
    }

}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if(!keyTrans) return "UNKNOWN";
    
    var txt = keyTrans[gCurrLang] // he
    if(!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        
        if(el.localName === "input") {
            el.setAttribute("placeholder",txt)
            // el.placeholder = txt
        } else el.innerText = txt 
    })
}

function setLang(lang) {
    gCurrLang = lang; // he
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang,options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}

