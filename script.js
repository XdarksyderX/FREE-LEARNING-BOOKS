
async function fetchData (url) {
    
    const response = await fetch(url, {
        method: 'GET'
    })
    .then( response => response.json())
    return await response

}
var categories = {};

let subcategories =  {};
fetchData("https://www.etnassoft.com/api/v1/get/?get_categories=all").then( value => {
    for (val of value)
    {
        categories[val.name] = val["category_id"]
        let categoryId = val["category_id"]
        fetchData(`http://www.etnassoft.com/api/v1/get/?get_subcategories_by_category_ID=${val["category_id"]}`).then ( value => {

            let subcategoryArr = []
            for(val of value)
            {
                let id = val["category_id"]
                let subcategory = val
                subcategoryArr.push(subcategory)
                
            }
            subcategories[categoryId] = subcategoryArr;
        }
        )
        
    }
}
)








const CATEGORY = document.getElementById('category');
const SUBCATEGORY = document.getElementById('subcategory');
const GENERATE = document.getElementById('generate-button');

let appended = false
const appendCategories = _ => {
    for (id in categories){ 
        let category = document.createElement('option')
        category.value = categories[id];
        category.innerHTML = id; 
        CATEGORY.appendChild(category)
    }
}

const appendSubcategories = _ => {
    let subcategory = document.createElement('option')
    subcategory.value = "SUBCATEGORY"
    subcategory.innerHTML = "SUBCATEGORY"
    SUBCATEGORY.appendChild(subcategory)
    
    let id = CATEGORY.value
    let subcategoriesCat = subcategories[id]
        for (subcategory of subcategoriesCat){
            let subcategoryOp = document.createElement('option')
            subcategoryOp.value = subcategory.subcategory_id
            subcategoryOp.innerHTML = subcategory["name"]
            SUBCATEGORY.appendChild(subcategoryOp)
        }
}

const removeSubcategories = _ => {
    var i, L = SUBCATEGORY.options.length - 1;
    for(i = L; i >= 0; i--) {
        SUBCATEGORY.remove(i);
    }
}

CATEGORY.addEventListener('mouseenter', ev => {
    if (!appended){
        appendCategories();
        appended = true;
    }

})


CATEGORY.addEventListener('change', ev => {
        removeSubcategories()
        appendSubcategories()
    }
    
)
let book = {
    image : document.getElementById('book-image'),
    link : document.getElementById('book-link'),
    title : document.getElementById('book-title')
}

 GENERATE.addEventListener('click', ev => {
        if (SUBCATEGORY.value !== 'SUBCATEGORY')
        {
            
            fetchData(`https://www.etnassoft.com/api/v1/get/?subcategory_id=${SUBCATEGORY.value}`)
            .then( val => {
                
                const BOOK = val[Math.floor(Math.random() * val.length + 1)]
                console.log(BOOK)
                book.image.setAttribute("src", BOOK.cover);
                book.link.setAttribute("href", BOOK.url_download);
                book.title.setAttribute("value", BOOK.title);
            })
        }
        else {
            console.log(`https://www.etnassoft.com/api/v1/get/?category_id=${CATEGORY.value}`)
            fetchData(`https://www.etnassoft.com/api/v1/get/?category_id=${CATEGORY.value}`).then( val => {
                
                const BOOK = val[Math.floor(Math.random() * val.length + 1)]
                console.log(BOOK)
                book.image.setAttribute("src", BOOK.cover);
                book.link.setAttribute("href", BOOK.url_download);
                book.title.setAttribute("value", BOOK.title);
            })
            

        }
    }
)
