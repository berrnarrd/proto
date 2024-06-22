$(document).ready(function () {
    const apiKey = '1ndJ3PN29QFfwwV5YIR6-yviqdM3rvBOLX9Kx7IGBHeDneiY';
    const apiUrl = `https://api.currentsapi.services/v1/search?apiKey=${apiKey}&keywords=healthcare`;

    function fetchNews(keyword = 'health') {
        fetch(`https://api.currentsapi.services/v1/search?apiKey=${apiKey}&keywords=${keyword}`)
            .then(response => response.json())
            .then(data => {
                let articlesHtml = '';
                data.news.forEach(article => {
                    if (article.image && article.image !== 'None' && article.description && article.title && article.url) {
                        articlesHtml += `
                            <div class="col-lg-3 col-md-6 col-12">
                                <div class="single-news">
                                    <div class="news-head">
                                        <img src="${article.image}" alt="#">
                                    </div>
                                    <div class="news-body">
                                        <div class="news-content">
                                            <div class="date">${new Date(article.published).toLocaleDateString()}</div>
                                            <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
                                            <p class="text">${article.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                });

                // Check if there are enough valid articles, if not, fetch more
                if (articlesHtml === '') {
                    fetchNews(keyword); // Recursively fetch more articles until valid ones are found
                } else {
                    $('#news-articles').html(articlesHtml);
                }
            })
            .catch(error => console.error('Error fetching news articles:', error));
    }

    fetchNews(); // Initial fetch with default keyword
});