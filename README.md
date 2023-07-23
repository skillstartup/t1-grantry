# Coding Challenge
The website FeedMe serves as a search aggregator and aims to provide latest news updates based on users' chosen topic. 

## My Solution In Action
https://github.com/skillstartup/t1-grantry/assets/140294662/3a0cce1c-2fc2-43ec-9a8c-c869caf8c1c3

## What I Built
A search aggregator that retrieves news articles based on user-selected topics. The solution is web-based, responsive to various screen sizes, and displays the search results sorted by the time of release, ensuring that the latest new is always presented.

## How I Built It
HTML, CSS, and JavaScript were utilised to provide the structure, styling, and interactivity for the static webpage.

[jQuery](https://jquery.com/): to simplify DOM manipulation and AJAX requests.

[News API](https://newsapi.org/): to fetch news articles based on user-selected topics.
```javascript
const API_KEY = "34ffe08a39904daba6baf72d27635bf2";
const URL = "https://newsapi.org/v2/everything?language=en&q=";
...
var result = await fetch(`${URL}${query}&sortBy=publishedAt&apiKey=${API_KEY}`);
```

## Why I Built It This Way
I chose to build a static webpage without a backend server or database to keep the development process simple and efficient, considering the time constraints of this coding challenge.

The solution provides popular topics for users to choose from, allowing them to explore widely discussed subjects. Additionally, users can search for specific topics they are interested in. The articles are sorted based on their published date to ensure that the latest news stories are always displayed first.

To optimise the performance and avoid overwhelming the user with a large number of articles, I implemented pagination. The solution displays 15 articles at a time, and more articles are loaded as the user scrolls to the bottom of the page.

By adjusting the header and number of columns displayed on the screen, as well as implementing flexbox, it is responsive to different screen sizes, allowing users to access it from both desktops and mobile devices.

## What would I consider doing to improve or extend the solution
#### More efficient searching experience:
Provide auto-complete for the search bar so that the users could find relevant topics more efficiently.
Implement search filters allowing the users to select date ranges, sources, or sorting orders to refine the search results.

#### User authentication and customisation:
By incorporating a database to store authentication information as well as each user's preferences such as their favourite news sources and interested topics, the website could potentially provide personalised recommendations.
