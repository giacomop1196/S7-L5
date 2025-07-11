const endpoint = 'https://striveschool-api.herokuapp.com/api/product/'
const cardContainer = document.getElementById('card-container')

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
        .then((arrayOfProducts) => {
            console.log(arrayOfProducts)
            if (arrayOfProducts.length === 0) { //Se non ci sono prodotti

            } else { //Se ci sono prodotti
                arrayOfProducts.forEach((product) => {
                    cardContainer.innerHTML += `
                    
                    <div class="col" id="card-${product._id}">
                    <div class="card h-100">
                    <a class="text-black text-decoration-none" href="./detail.html?eventId=${
                    product._id
                  }">
                        <img src="${product.imageUrl}" class="card-img-top object-fit-cover" style="height: 230px; alt="img-${product._id}">
                        <div class="card-body">
                            <h5 class="card-title text-center">${product.name}</h5>
                             <h6 class="card-title text-center">€${product.price},00</h6>
                        </div></a>
                    </div>
                </div>

                    `
                })

            }
        })
        .catch((err) => {
            console.log('Errore: ', err)
        })

}

getProducts()