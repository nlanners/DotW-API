const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const source = 'https://www.cdc.gov/dotw?Sort=Date%3A%3Adesc';


/************************ Start Model Functions ******************************/

async function getCurrentDotW() {
    try {
        const response = await axios.get(source);
        const html = response.data;
        const $ = cheerio.load(html);

        const cards = $('.card-body', html);

        let card = {};

        card.title = $(cards[1]).find('.card-title').text();
        card.summary = $(cards[1]).find('p').text();
        card.url = "https://www.cdc.gov" + $(cards[1]).find('a').attr('href');

        return card;

    } catch (err) {
        console.log(err);
    }
}


/************************ End Model Functions ******************************/

/********************* Start Controller Functions ******************************/

app.get('/current', async (req, res) => {
    try {
        const card = await getCurrentDotW();

        res.json(card);

    } catch (err) {
        console.log(err);
    }
});

app.get('/all', async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);
    }

    res.end();
});


/********************* End Controller Functions ******************************/

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));