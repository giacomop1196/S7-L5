const endpoint = 'https://striveschool-api.herokuapp.com/api/product/'

//Funzione per visualizzare tutti i prodotti
const getProducts = function () {
    fetch(endpoint, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzY5MDc4Y2RkZjAwMTU1ZDY3YTgiLCJpYXQiOjE3NTIyMjEzMjgsImV4cCI6MTc1MzQzMDkyOH0.VIZlPEtimlRoj4jmZz3sAnni-A175JV_S-5tcBLAmeQ"
        }
    })

    .then((res) => {
        if(res.ok){
            return res.json()
        } else{
            throw new Error('Errore nella response')
        }
    })
    .then((ArrayOfProducts) => {
        console.log(ArrayOfProducts)
    })
    .catch((err) => {
        console.log('Errore: ', err)
    })

}

getProducts()