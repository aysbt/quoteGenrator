// Get Qutes from API
const quoteContainer =document.getElementById('quote-container');
const quoteText =document.getElementById('quote');
const authorText =document.getElementById('author');
const twitterBtn =document.getElementById('twitter');
const newQuoteBtn =document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQutes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Not Showing Loading
function noLoading(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}
//Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQutes[Math.floor(Math.random() * apiQutes.length)];

    // Check if Author field blank and replace it with 'Unkown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    //check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
            quoteText.classList.remove('long-quote');
    }
    //Set the Quote, hide Loader
    quoteText.textContent = quote.text;
    noLoading();
}

async function getQuotes() {
    loading();
    const apiUrl =' https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQutes =  await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }    
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On Load
getQuotes();
