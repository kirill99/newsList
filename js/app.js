/*
{
    status: true,
    data:{
        articles:[
            {
                "source": {
                    "id": "cnn",
                    "name": "CNN"
                },
                "author": "Angus Watson, CNN",
                "title": "Cleo Smith kidnapping suspect sent to hospital after self-harming in police custody - CNN",
                "description": "A 36-year-old man arrested Wednesday in connection with the apparent abduction of 4-year-old Cleo Smith was taken to hospital after self-harming while in police custody, Western Australia Police said Thursday.",
                "url": "https://www.cnn.com/2021/11/04/australia/cleo-smith-kidnapping-suspect-hospital-intl-hnk/index.html",
                "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/211103015140-cleo-smith-found-super-tease.jpg",
                "publishedAt": "2021-11-04T07:48:00Z",
                "content": "Sydney, Australia (CNN)A 36-year-old man arrested Wednesday in connection with the apparent abduction of 4-year-old Cleo Smith was taken to hospital after self-harming while in police custody, Wester… [+1349 chars]"
            },
        ]
    }

}



*/

// test 
const testArrayArticles = {
    status: true,
    data:{
        articles:[
            {
                "source": {
                    "id": "reuters",
                    "name": "Reuters"
                },
                "author": null,
                "title": "Mozambique urges Credit Suisse to fully cancel scam-linked debt - Reuters",
                "description": "Mozambique on Thursday called on Credit Suisse <a href=\"https://www.reuters.com/companies/CSGN.S\" target=\"_blank\">(CSGN.S)</a> to fully cancel debt estimated at $2 billion linked to a scandal involving the bank, ten times more than it has offered to write off.",
                "url": "https://www.reuters.com/business/finance/mozambique-urges-credit-suisse-fully-cancel-scam-linked-debt-2021-10-21/",
                "urlToImage": "https://www.reuters.com/resizer/kDhGWeDcVibO6oG-GJRdvQNz72M=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/WSMDDYOWWRIH3CJTPT7RBWQUOU.jpg",
                "publishedAt": "2021-10-21T14:15:00Z",
                "content": "The logo of Swiss bank Credit Suisse is seen at its headquarters in Zurich, Switzerland March 24, 2021. REUTERS/Arnd Wiegmann JOHANNESBURG, Oct 21 (Reuters) - Mozambique on Thursday called on Credit … [+1645 chars]"
            }
        ]
    }
};



(function(){
    const httpRequest = function(){
        const apiKey = "11e71b3952e64703b8e1ff9d5f653ca8";
        const xhr = new XMLHttpRequest();
        
    
        function generateResponse(obj){
            console.log(JSON.parse(obj.responseText))
            return Math.floor(obj.status / 100) == 2 
                ? { status:true, data: JSON.parse(obj.responseText) } 
                : { status:false, data: obj }
        }
    
    
        function getNews(){
            const url = "https://newsapi.org/v2/everything";
    
            function getPopularNews(article, cb){
                const localeUrl = `${url}?q=${article}&sortBy=popularity&apiKey=${apiKey}`
                xhr.open("GET", localeUrl);
    
                xhr.setRequestHeader("X-Api-Key", apiKey)
    
                xhr.addEventListener('load', () => {
                    cb(generateResponse(xhr));
                })
    
                xhr.addEventListener('error', () => {
                    cb(generateResponse(xhr));
                })
    
    
                xhr.send();
            }
    
            function getNewsByCountry(){
                const localeUrl = `${url}?sortBy=popularity&apiKey=${apiKey}`
                xhr.open("GET", localeUrl);
    
            }
    
            return {
                getPopularNews,
                getNewsByCountry
            }
        }
    
    
        return {
            getNews
        }
    }();

    const container = document.querySelector('.news .cards');
    const titleNews = document.getElementById('titleNews');

    function templateCard(item){
        // create div card
        const card = document.createElement('div')
        card.classList.add('card');

        // create Image 
        const divImage = document.createElement('div');
        divImage.classList.add('image');
        divImage.style.backgroundImage = `url(${item.urlToImage})`;
        card.appendChild(divImage);


        // create title
        const divTitle = document.createElement('div');
        divTitle.classList.add('title');
        const spanTitle = document.createElement('span');
        spanTitle.textContent = item.title;
        divTitle.appendChild(spanTitle);
        card.appendChild(divTitle);

        // create description
        const divDescription = document.createElement('div');
        divDescription.classList.add('description');
        const spanDescription = document.createElement('span');
        spanDescription.insertAdjacentHTML('afterbegin', item.description);
        divDescription.appendChild(spanDescription);
        card.appendChild(divDescription)

        return card;
    }

    function generateCards(cards){
        const fragment = document.createDocumentFragment();

        Object.values(cards).forEach((cardItem) => {
            const card = templateCard(cardItem)
            fragment.appendChild(card);
        })

        return fragment;
    }


    function getPopularNewsEverything(article = 'bitcoin'){
        console.log(httpRequest);
        httpRequest.getNews().getPopularNews(article, generateNews)
    }

    function generateNews(obj){
        if (obj.status === false){
            console.log('Получить данные не удалось. Код ошибки: ' + obj.data.status);
        }
        const cards = generateCards(obj.data.articles);

        if (container.childElementCount > 0){
            container.innerHTML = '';
        }
        container.appendChild(cards);
    }

    const formSearchArticle = document.forms['searchArticleForm'];


    // getPopularNewsEverything();

    // we display popular news when opening the page
    // get http request from popular news by article
    //submit formEverything
    formSearchArticle.addEventListener('submit', (e)=>{
        e.preventDefault(); 
        let article = formSearchArticle[0].value.trim();
        article = article == '' ? undefined : article;

        getPopularNewsEverything(article);
    })
})()
