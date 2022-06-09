const PORT = process.env.PORT || 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const cors = require('cors');

const app = express();
app.use(cors());
app.enable('trust proxy');

const source = 'https://www.cdc.gov/dotw?Sort=Date%3A%3Adesc';


/************************ Start Model Functions ******************************/

async function getCurrentDotW() {
    try {
        const response = await axios.get(source);
        const html = response.data;
        const $ = cheerio.load(html);

        const cards = $('.card-body.bg-purple-q', html);

        let card = {};

        card.title = $(cards).find('.card-title').text();
        card.summary = $(cards).find('p').text();
        card.url = "https://www.cdc.gov" + $(cards).find('a').attr('href');

        return card;

    } catch (err) {
        console.log(err);
    }
}


/************************ End Model Functions ******************************/

/********************* Start Controller Functions ******************************/

app.get('/', async (req, res) => {
    try {
        const card = await getCurrentDotW();

        res.json(card);

    } catch (err) {
        console.log(err);
    }
});


/********************* End Controller Functions ******************************/

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));