(function () {
    //storing elements in variables
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const all = document.querySelector('body');
    //starting submitting event to get date from api
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        //storing value of search in a variable
        responseContainer.innerHTML = '';
        all.lastChild.remove();
        searchedForText = document.querySelector('#search-keyword').value;
        
        // store search value into variable to use it in API fetch
        searchedForText = searchField.value;
        //fetch data from api
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, 
        {
            //using header for aurthorization
            headers: {
                'Authorization': 'Client-ID e8NfRJSTCoZ4A_1xTVA0Xe39EADQe4vJsldt2uS6w0Y'
            }
        }
        ).then(function(response) {
            //transfrom date into json object to use it later
            return response.json();
        }).then((data) => {
            // start adding containers that contain search results
            var i;
            for(i = 0; i < data.results.length ; i++) {
                let content;
                    if (data.results[i].alt_description) {
                        content = data.results[i].alt_description;
                    } else {
                        content = "No Caption found";
                    }
                
                if (i == 0) {
                    responseContainer.insertAdjacentHTML('beforeend',`
                    <div class="mySlides fade">
                    <div class="numbertext"> ${(i + 1)} / ${data.results.length}</div>
                    <img src="${data.results[i].urls.regular}" style="width:100%">
                    <div class="text">${content}</div>
                    </div>
                    `);
                } else {
                    responseContainer.insertAdjacentHTML('beforeend',`
                    <div class="hide mySlides fade">
                    <div class="numbertext"> ${(i + 1)} / ${data.results.length}</div>
                    <img src="${data.results[i].urls.regular}" style="width:100%">
                    <div class="text">${content}</div>
                    </div>
                    `);
                }
                    
            }
            //adding links to swap
            responseContainer.insertAdjacentHTML('beforeend', 
            `<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>`
            )
            // create div to contain dots
            const element = document.createElement('div');
            element.style.textAlign = "center";
            all.appendChild(element);
            for(var i = 0; i < data.results.length ; i++) {
                element.insertAdjacentHTML('beforeend',`
                <span class="dot" onclick="currentSlide(${(i+1)})"></span> 
                `);
                
            }
        })
    });


})();
