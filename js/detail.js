const endpoint = 'https://striveschool-api.herokuapp.com/api/product/'
const parameters = new URLSearchParams(location.search)
const eventId = parameters.get('eventId')
const productName = document.getElementById('name')
const productId = document.getElementById('product-id')
const productPrice = document.getElementById('price')
const productDescription = document.getElementById('description')
const productImg = document.getElementById('product-img')
const productBrand = document.getElementById('product-brand')
const pageTitle = document.getElementById('page-title')
const pageFavicon = document.getElementById('favicon')

console.log(eventId)

fetch(endpoint + '/' + eventId, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzY5MDc4Y2RkZjAwMTU1ZDY3YTgiLCJpYXQiOjE3NTIyMjEzMjgsImV4cCI6MTc1MzQzMDkyOH0.VIZlPEtimlRoj4jmZz3sAnni-A175JV_S-5tcBLAmeQ"
    }
})
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Errore nel recupero dettaglio evento')
        }
    })
    .then((productDetail) => { //Ho recuperato il prodotto
        console.log(productDetail)
        productName.innerText = productDetail.name
        productId.innerText = 'ID: ' + productDetail._id
        productPrice.innerText = '€' + productDetail.price + ',00'
        productDescription.innerText = productDetail.description
        productImg.src = productDetail.imageUrl
        productBrand.innerText = productDetail.brand
        pageTitle.innerText = productDetail.name // Titolo della pagina
        pageFavicon.href = productDetail.imageUrl // Favicon uguale all'immagine del prodotto

    })
    .catch((err) => {
        console.log('ERRORE', err)
    })
