document.addEventListener("DOMContentLoaded", async function() {
    // Function to fetch data based on selected news type
    async function fetchNews() {
        const newsType = document.getElementById("news-type").value;
        let url = '';

        // Set the URL based on the selected news type
        switch (newsType) {
            case 'latest':
                url = 'https://investing11.p.rapidapi.com/get_news?news_type=latest&page=1';
                break;
            case 'popular':
                url = 'https://investing11.p.rapidapi.com/get_news?news_type=popular&page=1';
                break;
            case 'market_overview':
                url = 'https://investing11.p.rapidapi.com/get_news?news_type=market_overview&page=1';
                break;
                case 'stock_markets':
                url = 'https://investing11.p.rapidapi.com/get_analysis?analysis_type=stock_markets&page=1';
                break;
                case 'currencies':
                url = 'https://investing11.p.rapidapi.com/get_analysis?analysis_type=currencies&page=1';
                break;
            
            default:
                url = 'https://investing11.p.rapidapi.com/get_news?news_type=latest&page=1';
                break;
        }

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'd85862a3eamsha6bc8ad1d7335c5p12c851jsne25647dbabed',
                'x-rapidapi-host': 'investing11.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            // Assuming the array of news is located at result.data
            const newsItems = result.data || []; // Adjust 'data' based on actual response

            let output = '<h2>News</h2><ul>';
            newsItems.forEach(newsItem => {
                const title = newsItem.title;
                const publishedDate = new Date(newsItem.published_at * 1000).toLocaleString();
                const author = newsItem.author || 'Unknown';
                const newsUrl = newsItem.url;

                output += `
                <li>
                    <a href="${newsUrl}" target="_blank">
                        <strong>${title}</strong><br>
                        <em>Published on:</em> ${publishedDate} <br>
                        <em>Author:</em> ${author}
                    </a>
                </li>
            `;
            });

            output += '</ul>';
            document.getElementById("output").innerHTML = output;

        } catch (error) {
            console.error("Error fetching news:", error);
            document.getElementById("output").innerHTML = "<p>Error fetching news.</p>";
        }
    }

    // Fetch news on page load (default)
    fetchNews();

    // Fetch news when dropdown selection changes
    document.getElementById("news-type").addEventListener("change", fetchNews);
});
