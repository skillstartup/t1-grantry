// News API https://newsapi.org/
const API_KEY = "34ffe08a39904daba6baf72d27635bf2";
// "a57775a0da9e45bd93a4cb59c3b711b4";
const URL = "https://newsapi.org/v2/everything?language=en&q=";
const pageSize = 15;
var page = 0;
var lastData;

// display global news by default
$(document).ready(function() {
    $("li").css("color", "#fff");
    $("#global").css("color", "rgb(106, 178, 240)");
    $("#queryTopic").html("");
    fetchNews('global');
});

// 5 popular topics:
// Global
// highlight the popular topic
// clear any query topic display, clear search box
$(".global").click(function() {
    $("li").css("color", "#fff");
    $("#global").css("color", "rgb(106, 178, 240)");
    $("#queryTopic").html("");
    $('#searchBar').val('');
    fetchNews('global');
});

// Politics
$("#politics").click(function() {
    $("li").css("color", "#fff");
    $("#politics").css("color", "rgb(106, 178, 240)");
    $("#queryTopic").html("");
    $('#searchBar').val('');
    fetchNews('politics');
});
// Business
$("#tech").click(function() {
    $("li").css("color", "#fff");
    $("#tech").css("color", "rgb(106, 178, 240)");
    $("#queryTopic").html("");
    $('#searchBar').val('');
    fetchNews('tech');
});
// Sports
$("#sports").click(function() {
    $("li").css("color", "#fff");
    $("#sports").css("color", "rgb(106, 178, 240)");
    $("#queryTopic").html("");
    $('#searchBar').val('');
    fetchNews('sports');
});
// entertainment
$("#entertainment").click(function() {
    $("li").css("color", "#fff");
    $("#entertainment").css("color", "rgb(106, 178, 240)");
    $("#queryTopic").html("");
    $('#searchBar').val('');
    fetchNews('entertainment');
});



// topic search
$('#searchBtn').on('click', function(e){
    var topic = $('#searchBar').val().trim();
    // Alert if user enters an empty search keyword
    if (topic == '') {
        e.preventDefault();
        alert('Please enter a valid search keyword that is not empty.');
        $('#searchBar').val('');
    }
    // clear popular topic selection
    // display the query topic
    else {
        $("li").css("color", "#fff");
        $("#queryTopic").html("<h3>Latest news about: " + topic + "</h3>");
        window.scrollTo (0,0);
        fetchNews(topic);
    }
});


//get articles about the query, sorted by recent first
// !! display 15 articles at a time.
async function fetchNews(query) {
    try{
    var result = await fetch(`${URL}${query}&sortBy=publishedAt&apiKey=${API_KEY}`);
    if (!result.ok) {
        $("#queryTopic").html("<h3> HTTP error, please try again later or search for another topic.</h3>");
        throw new Error(`HTTP error! status: ${result.status}`);
    }
    // console.log(result);
    var data = await result.json();
    // console.log(data.articles);

    // clean display section when refresh
    const display = document.getElementById("display");
    display.innerHTML = "";

    // reset pagination variables
    page = 0;
    lastData = data.articles;
    window.scrollTo (0,0);
    displayData(lastData, page);
    // page++;

    } catch (error) {
        console.error(error);
    }
}

function displayData(articles, page) {
    const display = document.getElementById("display");
    const template = document.getElementById("template");

    // var i = 0;

    for(var i = 0; i < pageSize; i++) {
        var article = articles[page * 15 + i];

        // only display the ones with image
        // if(article.urlToImage) {

            var templateToFill = template.content.cloneNode(true);
            if(!article.urlToImage) 
                updateCard(templateToFill, article,false);
            else 
            updateCard(templateToFill, article,true);

            display.appendChild(templateToFill);
            // i++
        // }
    }

    // articles.forEach((article) => {
    //     const template = document.getElementById("template");
    //     // only display the ones with image
    //     if(article.urlToImage) {

    //         var templateToFill = template.content.cloneNode(true);
    //         updateCard(templateToFill, article);
    //         display.appendChild(templateToFill);
    //     }
    //   });
}

function updateCard(card, article, hasImage) {
    if(hasImage){
        var img = card.querySelector("img");
        img.src = article.urlToImage;
    }
    

    var title = card.querySelector("#title");
    title.textContent = article.title

    var source = card.querySelector("#source");
    source.innerHTML = article.source.name 
    // + "<br>" + article.publishedAt;

    var content = card.querySelector("#content");
    content.textContent = article.description;

    var url = card.querySelector("#url");
    url.href = article.url;
    
}

window.addEventListener('scroll', function() {
    console.log(window.innerHeight + window.scrollY, document.body.offsetHeight);
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if((page+2) * pageSize < lastData.length) {
            // if the user has scrolled to the bottom of the page, display the next 15 articles
            page++;
            displayData(lastData, page);
        }        
    }
});