import express from 'express';
import { PuppeteerCrawler, Configuration,Dataset } from 'crawlee';
import { router } from './routes.js';

const app = express();
const port = process.env.PORT || 4000;

// Define the start URLs and proxy configuration
const startUrls = ['https://crawlee.dev'];



// Create the PuppeteerCrawler instance
const crawler = new PuppeteerCrawler({
    requestHandler: router,
    headless: false,
    requestHandlerTimeoutSecs: 300,
    maxConcurrency : 1,
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
            // Ensure headless mode is enabled
        }
    },

    // Comment this option to scrape the full website.

});

// Endpoint to start the crawler
app.get('/start-crawl', async (req, res) => {
    try {
        await crawler.run(startUrls);
       const dd=await  Dataset.getData();
        res.send({
            data: dd
        });
    } catch (error) {
        console.error('Error during crawling:', error);
        res.status(500).send('Error during crawling');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
