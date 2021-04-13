(async ()=>{

    let buttonInput = document.querySelector('#buttonInput');
    let input = document.querySelector('#input');
    let topic;

    let KEY = '79128aa3c56e40a4a63f582e3a059a98';
    async function main() {
        
        let URL = `https://newsapi.org/v2/everything?q=${topic}&pageSize=100&apiKey=${KEY}`;


        let news = await fetch(URL);

            news = await news.json();

            news = news.articles;

            console.log(news);

    
        let newsListSection     = document.querySelector('#news-list-place');

        let newsListOutputPlace = document.querySelector('#news-list-place div');

        let oneNewsSection      = document.querySelector('#one-news-place');

        let oneNewsOutputPlace  = document.querySelector('#one-news-place article');

    
        let backButton = document.querySelector('#back-button');

        backButton.addEventListener('click', function(){

            newsListSection.classList.remove('d-none');

            oneNewsSection.classList.add('d-none');

        });


        newsListOutputPlace.innerHTML = news.map( (item, i) => `

            <div data-id='${i}' class="col">
                <div class="card h-100">
                <img src="${item.urlToImage}" class="card-img-top" alt="piche">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.content.substring(0, 100)}...</p>
                </div>
                </div>
            </div>
        `).join('');

        
        for(let li of newsListOutputPlace.children){
            li.addEventListener('click', function(){
                console.log(`Selected news ID #${this.dataset.id} in 'news' array.`);

                let currentNews = news[this.dataset.id];

                oneNewsOutputPlace.innerHTML = `
                    <h1>${currentNews.title}</h1>
                    <div>${currentNews.publishedAt}</div>
                    
                    <p><i>${currentNews.description}</i></p>
                    
                    <img class='img-thumbnail' src="${currentNews.urlToImage}">


                    <p>${currentNews.content}</p>

                    <a href="${currentNews.url}" target="_blank" class="btn btn-primary">Read Original</a>
                `;

                oneNewsSection.classList.remove('d-none');

                newsListSection.classList.add('d-none');

            });
        }
    }
    main();

    buttonInput.addEventListener('click', async function(){
        console.log(input.value);
        topic = input.value;
        main();
    });

})();

