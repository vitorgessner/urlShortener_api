const bodyParser = require('body-parser');
const fs = require('fs/promises')
const dns = require('dns');

const express = require('express');
const app = express();
const port = 3000;

const listaUrls = require(__dirname + '/public/listaUrl').default
let counting = 1;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

app.get('/', async (req, res) => {
    res.urls = await listaUrls();
    res.sendFile(__dirname + '/src/index.html')
})

app.post('/api/shorturl', (req, res) => {
    dns.lookup(req.body.site, {}, async (err, address, family) => {
        if (err) {
            console.log(err);
            return res.json({ error: 'invalid url' });
        }
        original_url = req.body.site;
        const short_url = counting++;

        let urls = await listaUrls();

        if (!urls) {
            return res.json({ error: 'invalid url' })
        }
        urls[short_url] = original_url;
        fs.writeFile('paths.json', JSON.stringify(urls, null, 2));
        res.json({ original_url, short_url });
    })
})

app.get('/api/shorturl/:short_url', async (req, res) => {
    const shortUrl = req.params.short_url;
    let urls = await listaUrls();

    const originalUrl = urls[shortUrl];
    if (originalUrl.indexOf('https://') !== -1){
        return res.redirect(originalUrl);
    }
    return res.redirect(`https://${originalUrl}`);

})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})