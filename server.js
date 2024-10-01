const puppeteer = require('puppeteer-extra');
const express = require('express');
const path = require('path');
const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Fetch price from Flipkart
async function fetchPriceFromFlipkart(productName) {
    const puppeteer = require('puppeteer-extra');
    const stealthPlugin = require('puppeteer-extra-plugin-stealth')();
    puppeteer.use(stealthPlugin);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    const url = `https://www.flipkart.com/search?q=${encodeURIComponent(productName)}`;

    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });

        // Wait for the price element to appear
        await page.waitForSelector('div.Nx9bqj._4b5DiR', { timeout: 10000 });

        const price = await page.evaluate(() => {
            const priceElement = document.querySelector('div.Nx9bqj._4b5DiR');
            return priceElement ? priceElement.innerText : 'Price not found';
        });

        const link = await page.evaluate(() => {
            const linkElement = document.querySelector('a.CGtC98');
            return linkElement ? linkElement.href : 'Link not found';
        });

        await browser.close();
        return { price, link };

    } catch (error) {
        console.error(`Error fetching price from Flipkart:`, error);
        await browser.close();
        return { price: 'Price not found', link: 'Link not found' };
    }
}

// Fetch price from Amazon
async function fetchPriceFromAmazon(productName) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    const url = `https://www.amazon.in/s?k=${encodeURIComponent(productName)}`;

    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
        await page.waitForSelector('.a-price .a-offscreen', { timeout: 10000 });

        const price = await page.evaluate(() => {
            const priceElement = document.querySelector('.a-price .a-offscreen');
            return priceElement ? priceElement.innerText : 'Price not found';
        });

        const link = await page.evaluate(() => {
            const linkElement = document.querySelector('.a-link-normal');
            return linkElement ? linkElement.href : 'Link not found';
        });

        await browser.close();
        return { price, link };

    } catch (error) {
        console.error(`Error fetching price from Amazon:`, error);
        await browser.close();
        return { price: 'Price not found', link: 'Link not found' };
    }
}

// Fetch price from Croma
// Fetch price from Croma
async function fetchPriceFromCroma(productName) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    const url = `https://www.croma.com/search/?text=${encodeURIComponent(productName)}`;

    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 10000 });
        await page.waitForSelector('span.amount.plp-srp-new-amount', { timeout: 10000 });

        const price = await page.evaluate(() => {
            const priceElement = document.querySelector('span.amount.plp-srp-new-amount');
            return priceElement ? priceElement.innerText : 'Price not found';
        });

        const link = await page.evaluate(() => {
            const linkElement = document.querySelector('h3.product-title a'); // Updated selector
            return linkElement ? linkElement.href : 'Link not found';
        });

        await browser.close();
        return { price, link };

    } catch (error) {
        console.error(`Error fetching price from Croma:`, error);
        await browser.close();
        return { price: 'Price not found', link: 'Link not found' };
    }
}


// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index3.html'));
});

// Endpoint to get prices from Flipkart, Amazon, and Croma, and display on the webpage
app.get('/fetch-prices', async (req, res) => {
    const product = req.query.product || '';  // Default product
    console.log(`Fetching prices for: ${product}`);

    const flipkartPrice = await fetchPriceFromFlipkart(product);
    const amazonPrice = await fetchPriceFromAmazon(product);
    const cromaPrice = await fetchPriceFromCroma(product);  // Added Croma price fetching

    // Return the prices to the frontend in JSON format
    res.json({
        product,
        flipkart: flipkartPrice,
        amazon: amazonPrice,
        croma: cromaPrice  // Include Croma price in the response
    });
});

// Start the server
app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
