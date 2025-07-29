import fs from 'fs/promises';

export default async function listaUrls() {
    try {
        const data = await fs.readFile('C:/Users/cpvet/Documents/7back-end/urlShortener_api/paths.json', 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.log(e);
        return {};
    }
}

// let urls = listaUrls();
// const tr = document.createElement('tr');
// for (let i = 0; i < urls.length; i++) {
//     const td = document.createElement('td');
//     tr.appendChild(td);
//     td.innerHTML = urls[i];
// }

// document.querySelector(".tbody").appendChild(tr);

