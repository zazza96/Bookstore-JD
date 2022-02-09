export default () => {
    waitUntilTrue(function() {
        return document.querySelectorAll('.book-item').length > 0;
    }, init, { timeout: 5000 });

    function init() {
        // code here
        // Select all generated books 
        const books = document.querySelectorAll('.book-item');

        // loop through all book
        for (const book of books) {
            const title = book.querySelector('h3');

            // check localstorage
            // If local storage has the title of the book then add class
            if (localStorage.getItem(title.textContent)) {
                book.classList.add('is-selected');
            } else {
                book.classList.remove('is-selected');
            }

            // add click event listener
            book.addEventListener('click', () => {
                if (!book.classList.contains('is-selected')) {
                    book.classList.add('is-selected');
                    localStorage.setItem(title.textContent, true);
                } else {
                    book.classList.remove('is-selected');
                    localStorage.removeItem(title.textContent);
                }
            });
        }
    }
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