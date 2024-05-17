import express from 'express';
import { PuppeteerCrawler, Configuration } from 'crawlee';
import { router } from './routes.js';

const app = express();
const port = process.env.PORT || 4000;

// Define the start URLs and proxy configuration
const startUrls = ['https://crawlee.dev'];



// Create the PuppeteerCrawler instance
const crawler = new PuppeteerCrawler({
    requestHandler: router,
    headless: true,

    launchContext: {
        launchOptions: {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process', // &lt;- this one doesn't work in Windows
                '--disable-gpu'
            ],
            headless: true // Ensure headless mode is enabled
        }
    },

    // Comment this option to scrape the full website.
    maxRequestsPerCrawl: 20,
}, new Configuration({
    persistStorage: false,
}));

// Endpoint to start the crawler
app.get('/start-crawl', async (req, res) => {
    try {
        await crawler.run(startUrls);
        res.send('Crawling completed!');
    } catch (error) {
        console.error('Error during crawling:', error);
        res.status(500).send('Error during crawling');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
