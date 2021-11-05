/* 
    news api key = 11e71b3952e64703b8e1ff9d5f653ca8
*/



function http(){
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

}


