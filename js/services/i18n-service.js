var gTrans = {
    pageTitle: {
        en: 'Welcome To My Book Shop!',
        es: '¡Bienvenidos a Mi Librería!',
        he: 'ברוך הבא לחנות ספרים שלי!'
    },
    subtitle: {
        en: 'MVC - Model-View-Controller',
        es: 'MVC - Modelo-Vista-Controlador',
        he: 'מודל - ויו - קונטרולר',
    },
    'title-search': {
        en: 'Search Via Title',
        es: 'Buscar por título',
        he: 'חיפוש לפי כותרת',
    },
    'filter-all': {
        en: 'All',
        es: 'Todos',
        he: 'הכל',
    },
    'filter-active': {
        en: 'Active',
        es: 'Activo',
        he: 'פעיל'
    },
    'filter-done': {
        en: 'Done',
        es: 'Completo',
        he: 'הושלם',
    },
    'stat-todo-label': {
        en: 'Todo',
        es: 'Hacer',
        he: 'לעשות',
    },
    'stat-active-label': {
        en: 'Active',
        es: 'Activo',
        he: 'פעיל',
    },
    add: {
        en: 'Add',
        es: 'Aggregar',
        he: 'הוסף',
    },
    sure: {
        en: 'Are you sure?',
        es: 'Estas Seguru?',
        he: 'בטוח נשמה?',
    },
    'add-placeholder': {
        en: 'Start typing...',
        es: 'Empieza a escribir...',
        he: 'תכתוב כאן...'
    },
    'sort': {
        en: 'Sorting Options:',
        es: 'Opciones de clasificación:',
        he: ':אופציות מיון'
    },
    'sort-min-rate': {
        en: 'Min Rate',
        es: 'Tasa Mínima',
        he: 'דירוג המינימלי'
    },
    'sort-max-price': {
        en: 'Max Price',
        es: 'Precio máximo',
        he: 'מחיר מקסימלי'
    },
    'starting-price': {
        en: 'Starting Price:',
        es: 'Precio inicial:',
        he: ':מחיר התחלתי'
    },
    'desc': {
        en: 'Decending',
        es: 'Descendente',
        he: 'יורד'
    },
    'btn-create': {
        en: 'Create New Book',
        es: 'Crear nuevo libro',
        he: 'תיצור ספר חדש'
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
    'read-book': {
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
    'new-title': {
        en: 'Think of a title',
        es: 'Piensa en un título',
        he: 'תחשוב על כותרת'
        
    },
    'new-price': {
        en: 'Think of a price',
        es: 'Piensa en un precio',
        he: 'תחשוב על מחיר'
    },
    submit: {
        en: 'Submit',
        es: 'Enviar',
        he: 'שלח'
    },
    'curr-page': {
        en: 'Current Page:',
        es: 'Página actual:',
        he: ':עמוד נוכחי'
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

