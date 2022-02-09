import stringCut from "./stringCut"

export default () => {

    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', ' https://www.googleapis.com/books/v1/volumes?q=HTML5', true)

    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        //loop though books
        if (request.status >= 200 && request.status < 400) {
            const bookItems = data.items;

            console.log(bookItems[0].volumeInfo.title)

            for (const bookItem of bookItems) {
                const title = bookItem.volumeInfo.title;
                const subtitle = '';
                const cover = bookItem.volumeInfo.imageLinks.smallThumbnail;
                const authors = bookItem.volumeInfo.authors;
                const count = bookItem.volumeInfo.pageCount;
                const description = stringCut(bookItem.volumeInfo.description);

                if (bookItem.volumeInfo.subtitle) {
                    subtitle = bookItem.volumeInfo.subtitle;
                }


                const component = itemHTML(title, subtitle, cover, authors, count, description);


                waitUntilTrue(function() {
                    return document.querySelectorAll('#main_content').length > 0;
                }, init, { timeout: 5000 });

                function init() {
                    // code here
                    document.querySelector('#main_content').insertAdjacentHTML('beforeend', component);
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
    return `
    <div class="book-item">
      <img class="book-item__img" src="${cover}">
      <h3 class="book-item__title">${title}<span class="book-item__subtitle">${subtitle}</span></h3>
      <p class="book-item__author">${authors}</p>
      <p class="book-item__pages">Pages: ${pageCount}</p>
      <p class="book-item__description">${description}</p>
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