import express from 'express';
import { PuppeteerCrawler, ProxyConfiguration } from 'crawlee';
import { router } from './routes.js';

const app = express();
const port = process.env.PORT || 4000;

// Define the start URLs and proxy configuration
const startUrls = ['https://crawlee.dev'];



// Create the PuppeteerCrawler instance
const crawler = new PuppeteerCrawler({
    requestHandler: router,
    headless: false,
    // Comment this option to scrape the full website.
    maxRequestsPerCrawl: 20,
});

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
