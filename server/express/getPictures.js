const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function getPictures(req, res) {
    const CATEGORY = req.query.category;
    const API_URL = `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&per_page=36&q=`;

    const response = await fetch(`${API_URL}${CATEGORY}`)
        .then(res => res.json())
        .catch(err => console.error(err));

    return res.json(response.hits);
}

module.exports = getPictures;