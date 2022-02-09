import stringCut from "./stringCut"

export default () => {

    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', ' https://www.googleapis.com/books/v1/volumes?q=HTML5', true)

    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        //check request status is successful and the api exists
        if (request.status >= 200 && request.status < 400) {
            const bookItems = data.items;

            //featured books
            const lastTwo = bookItems.splice(-2); // get last two elements
            const allButLastTwo = bookItems.slice(0, bookItems.length - 0); //get all elements but the last two

            //All Books
            for (const bookItem of allButLastTwo) {
                const title = bookItem.volumeInfo.title;
                const subtitle = '';
                const cover = bookItem.volumeInfo.imageLinks.smallThumbnail;
                const authors = bookItem.volumeInfo.authors;
                const count = bookItem.volumeInfo.pageCount;
                const description = stringCut(bookItem.volumeInfo.description);

                if (bookItem.volumeInfo.subtitle) {
                    subtitle = bookItem.volumeInfo.subtitle;
                }

                console.log(subtitle)


                const component = itemHTML(title, subtitle, cover, authors, count, description);


                waitUntilTrue(function() {
                    return document.querySelectorAll('#all-books__content').length > 0;
                }, init, { timeout: 5000 });

                function init() {
                    // code here
                    document.querySelector('#all-books__content').insertAdjacentHTML('beforeend', component);
                }



            }
            for (const featured of lastTwo) {
                const title = featured.volumeInfo.title;
                const subtitle = '';
                const cover = featured.volumeInfo.imageLinks.smallThumbnail;
                const authors = featured.volumeInfo.authors;
                const count = featured.volumeInfo.pageCount;
                const description = stringCut(featured.volumeInfo.description);

                if (featured.volumeInfo.subtitle) {
                    subtitle = featured.volumeInfo.subtitle;
                }

                console.log(subtitle)


                const component = itemHTML(title, subtitle, cover, authors, count, description);


                waitUntilTrue(function() {
                    return document.querySelectorAll('#featured__content').length > 0;
                }, init, { timeout: 5000 });

                function init() {
                    // code here
                    document.querySelector('#featured__content').insertAdjacentHTML('beforeend', component);
                }



            }
        } else {
            console.log('error')
        }
    }

    // Send request
    request.send()

}

function itemHTML(title, subtitle, cover, authors, pageCount, description) {
    //creating HTML to display book info
    return `
    <div class="book-item">
      <div class="book-item-image__containter"><img class="book-item__img" src="${cover}"></div>
      <div class="book-item__info">
        <h3 class="book-item__title">${title}<span class="book-item__subtitle"> ${subtitle}</span></h3>
        <p class="book-item__author">${authors}</p>
        <p class="book-item__pages">Pages: ${pageCount}</p>
        <p class="book-item__description">${description}...</p>
      </div>
  </div>
  `
}

function waitUntilTrue(fn, cb, time) {
    var timeUp = false;

    startTimer();
    isTrue();

    function isTrue() {
        if (fn()) return cb();
        if (timeUp) return;
        window.requestAnimationFrame(isTrue);
    }

    function startTimer() {
        if (!(time && time.timeout)) return;

        window.setTimeout(function stopTimer() {
            return timeUp = true;
        }, time.timeout);

    }

}