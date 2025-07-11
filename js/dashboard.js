const endpoint = 'https://striveschool-api.herokuapp.com/api/product/'
const addProductForm = document.getElementById('add-product-form')
const productTable = document.getElementById('product-table')
const productList = document.getElementById('product-list')


// PRODOTTO
class Product {
    constructor(_name, _description, _brand, _imageUrl, _price) {
        this.name = _name
        this.description = _description
        this.brand = _brand
        this.imageUrl = _imageUrl
        this.price = _price
    }
}

// Funzione per aggiungere un nuovo prodotto
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const nameInput = document.getElementById('name')
    const descriptionInput = document.getElementById('description')
    const brandInput = document.getElementById('brand')
    const imageInput = document.getElementById('imageUrl')
    const priceInput = document.getElementById('price')

    const productToSave = new Product(
        nameInput.value,
        descriptionInput.value,
        brandInput.value,
        imageInput.value,
        priceInput.value
    )

    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(productToSave),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzY5MDc4Y2RkZjAwMTU1ZDY3YTgiLCJpYXQiOjE3NTIyMjEzMjgsImV4cCI6MTc1MzQzMDkyOH0.VIZlPEtimlRoj4jmZz3sAnni-A175JV_S-5tcBLAmeQ"
        }
    })

        .then((res) => {
            if (res.ok) {
                addProductForm.reset()
            } else {
                throw new Error('Errore nella request', res.status)
            }
        })
        .catch((err) => {
            alert('ERRORE')
            console.log('ERRORE', err)
        })
})


//Funzione per visualizzare tutti i prodotti
const getProducts = function () {
    fetch(endpoint, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzY5MDc4Y2RkZjAwMTU1ZDY3YTgiLCJpYXQiOjE3NTIyMjEzMjgsImV4cCI6MTc1MzQzMDkyOH0.VIZlPEtimlRoj4jmZz3sAnni-A175JV_S-5tcBLAmeQ"
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('Errore nella response')
            }
        })
        .then((ArrayOfProducts) => {
            console.log(ArrayOfProducts)
            if (ArrayOfProducts.lenght === 0) {
                productTable.classList.add('d-none')
            } else {
                productTable.classList.remove('d-none')
                ArrayOfProducts.forEach()
            }
        })
        .catch((err) => {
            console.log('Errore: ', err)
        })

}

getProducts()


