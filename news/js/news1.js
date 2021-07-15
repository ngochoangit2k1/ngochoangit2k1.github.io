var api = "http://localhost:3000/posts";
var api1 = "https://newsapi.org/v2/everything?q=bitcoin&from=2021-06-14&sortBy=publishedAt&apiKey=3cb1442ab4e84e48909610309b947b54";

function start() {
    getApi(api1, renderNews);
    getApi(api1, renderCards);
    getApi(api1, renderNewsUpdate);
}
start();

function getApi(api, callback) {
    // fetch(api)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(callback)

        fetch(api)
            .then(function(response){
                return response.json();
                //JSON.parse: JSON -> JavaScript types
            })
            .then(function(pots){
                callback(pots);
            })
            .catch(function(err){
                console.log('có lỗi')
            })
}

//renderNews
function renderNews(elements) {
    var listNews = document.querySelector(".page-body-left-current");
    var reverseNews = elements.articles;

    var count = 0;
    console.log(reverseNews)
    var html = reverseNews.map(function (element) {
        count++;
        if (count <= 7) {
            return `
                <div class="page-body-left-current-bao">
                    <a href="${element.url}" target = "blank">
                        <div class="page-body-left-current-bao-img">
                            <img src="${element.urlToImage}" alt="">
                        </div>
                    </a>
                    <h2 class="page-body-left-current-bao-title"><a target = "blank" href="${element.url}" id="bao-link">${element.title}</a></h2>
                    <p class="bao-content">${element.content}</p>
                </div>
            `;
        }
    })
    listNews.innerHTML = html.join('');
}

var chu = 0;

//renderCards
function renderCards(elements,k) {
    var listNews = document.querySelector(".chua-card");
    console.log(k)
    console.log(typeof k)

    if(k === undefined){
        k=0;
    }
    console.log(typeof k)
    var reverseNews = elements.articles;
    // console.log(reverseNews)
    

    var count = chu + k;
    if(count>=6){
        count = 0;
    }

    if(count<0){
        count = 3;
    }

    chu = count;
    var html  = []
    console.log(count+3)
    for(var i = count; i<count+3;i++){
        html.push(
            `
            <div class="card">
                <a href="${reverseNews[i].url}" target="_blank">
                    <img src="${reverseNews[i].urlToImage}" alt="">
                    <div class="title-card">
                        <p class = "content-cart">${reverseNews[i].title}</p>
                    </div>
                </a> 
            </div>
            `
        )
    }
    listNews.innerHTML = html.join('');
    
    // var html = reverseNews.map(function (element) {
    //     count++;
    //     if (count <= max) {
    //         return `
    //             <div class="card">
    //                 <a href="">
    //                     <img src="${element.img}" alt="">
    //                     <div class="title-card">
    //                         <p class = "content-cart">${element.title}</p>
    //                     </div>
    //                 </a> 
    //             </div>
    //         `;
    //     }
    // })
}

function elm(elements){
    var reverseNews = [...elements.articles];    
    c = [...elements.articles];
    console.log(reverseNews)
    renderCards(reverseNews,-3)
}
function elm1(elements){
    var reverseNews = [...elements.articles];
    console.log(reverseNews)
    renderCards(reverseNews,3)
}

function HandleLeft(){
    getApi(api1, elm);
}
function HandleRight(){
    getApi(api1, elm1);
}


// console.log('----------------------')
// console.log(c)

// function handleLeft(n) {
//     renderCards(c,n)
//     console.log("123")
// }
// function handleRight(n) {
//     renderCards(c,n)
//     console.log("123")
// }





//renderNews
function renderNewsUpdate(elements) {
    var listNews = document.querySelector(".more-cards-news");

    var count = 0;
    var html = elements.articles.map(function (element) {
        count++;
        if (count <= 7) {
            return `

                <div class="card-news">
                    <div class="card-news-image">
                        <a href="${element.url}" target = "blank"><img src="${element.urlToImage}" alt="" class="update-new"></a> 
                    </div>
                    <a href="${element.url}" target = "blank"><h4 class="card-new-content-title">${element.title}</h4></a> 
                    <p class="card-new-content-cmt">${element.content}</p>
                </div>
            `;
        }
    })
    listNews.innerHTML = html.join('');
}