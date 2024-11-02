document.addEventListener("DOMContentLoaded", async function() {
    const url = 'https://investing11.p.rapidapi.com/get_news?news_type=latest&page=1';
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

        let output = '<h2>Latest News</h2><ul>';
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
});
