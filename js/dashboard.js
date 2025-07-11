const endpoint = 'https://striveschool-api.herokuapp.com/api/product/'
const addProductForm = document.getElementById('add-product-form')
const productTable = document.getElementById('product-table')
const productList = document.getElementById('product-list')
const totalProduct = document.getElementById('total-product')
const message = document.getElementById('no-product-message')

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
                addProductForm.reset() //Resetto il form
                productList.innerHTML = '' //Svuoto il contenuto della tabella
                getProducts() //Rilancio la funzione e ripopolo la tabella
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
        .then((arrayOfProducts) => {
            console.log(arrayOfProducts)
            if (arrayOfProducts.length === 0) {
                productTable.classList.add('d-none')
                message.innerHTML += `
                <div class="alert alert-danger" role="alert">
                            Nessun prodotto disponibile!
                        </div>
                `
            } else {
                totalProduct.innerText = arrayOfProducts.length
                productTable.classList.remove('d-none')
                message.innerHTML = '' //Nascondo il messaggio
                arrayOfProducts.forEach((product) => {

                    const creationDate = new Date(product.createdAt).toLocaleDateString('it-IT'); //Estrapolo solo la data senza l'orario

                    productList.innerHTML += `
                    <tr>
                                    <td id="${product._id}">${product._id}</td>
                                    <td>${product.name}</td>
                                    <td>${creationDate}</td>
                                    <td>€${product.price},00</td>
                                    <td>
                                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#edit-Modal-${product._id}">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                         </svg>
                                        </button>
                                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-Modal-${product._id}">
                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                         </svg>
                                        </button>
                                    </td>
                                </tr>

                                <!-- Delete Modal -->

                                    <div class="modal fade" id="delete-Modal-${product._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">${product.name}</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                        <div class="modal-body d-flex flex-column align-items-center justify-content-center">
                                            <svg class="text-danger mb-2" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                            </svg>
                                            <p class="text-center">Sei sicuro di voler eliminare ${product.name}?</p>
                                        </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                                                <button type="button" class="btn btn-primary" onclick="deleteProduct('${product._id}')">Elimina</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                     <!-- Edit Modal -->

                                    <div class="modal fade" id="edit-Modal-${product._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modifica ${product.name}?</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <form id="edit-product-form" data-product-id="${product._id}">
                                                    <div class="d-flex flex-column align-items-center justify-content-center">
                                                     <svg xmlns="http://www.w3.org/2000/svg" class="my-2 text-center" width="50" height="50" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                                     </svg></div>
                                                        <!--NOME PRODOTTO-->
                                                        <div class="mb-3">
                                                            <label for="name-${product._id}" class="form-label">Nome Prodotto</label>
                                                            <input required type="text" class="form-control" id="name-${product._id}" aria-describedby="emailHelp" value="${product.name}">
                                                        </div>
                                                        <!--DESCRIZIONE PRODOTTO-->
                                                        <div class="mb-3">
                                                            <label for="description-${product._id}" class="form-label">Descrizione Prodotto</label>
                                                            <textarea required type="text" class="form-control" style="min-height: 160px;" id="description-${product._id}"
                                                                aria-describedby="emailHelp" value="${product.description}">${product.description}</textarea>
                                                        </div>
                                                        <!--MARCA PRODOTTO-->
                                                        <div class="mb-3">
                                                            <label for="brand-${product._id}" class="form-label">Marca</label>
                                                            <input required type="text" class="form-control" id="brand-${product._id}"
                                                                aria-describedby="emailHelp" value="${product.brand}">
                                                        </div>
                                                        <!--IMMAGINE PRODOTTO-->
                                                        <div class="mb-3">
                                                            <label for="imageUrl-${product._id}" class="form-label">Immagine</label>
                                                            <input required type="text" class="form-control" id="imageUrl-${product._id}"
                                                                aria-describedby="emailHelp" value="${product.imageUrl}">
                                                        </div>
                                                        <!--PREZZO PRODOTTO-->
                                                        <div class="mb-3">
                                                            <label for="price-${product._id}" class="form-label">Prezzo</label>
                                                            <input required type="number" class="form-control" id="price-${product._id}"
                                                                aria-describedby="emailHelp" value="${product.price}">
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                                                            <!--PULSANTE MODIFICA PRODOTTO-->
                                                            <button type="submit" class="btn btn-primary m-4" onclick="editProduct('${product._id}')">Salva</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
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

//Funzione per eliminare un prodotto 
const deleteProduct = function (eventId) { //Passo eventId ovvero l'id del prodotto tramite oneclick deleteProduct('${product._id}')
    fetch(endpoint + '/' + eventId, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzY5MDc4Y2RkZjAwMTU1ZDY3YTgiLCJpYXQiOjE3NTIyMjEzMjgsImV4cCI6MTc1MzQzMDkyOH0.VIZlPEtimlRoj4jmZz3sAnni-A175JV_S-5tcBLAmeQ"
        }
    })
        .then((response) => {
            if (response.ok) {
                alert('ELIMINAZIONE AVVENUTA CON SUCCESSO')
                // Aggiorno la pagina
                location.assign('/dashboard.html')
            } else {
                throw new Error('Errore in fase di eliminazione')
            }
        })
        .catch((err) => {
            console.log('ERRORE', err)
        })
}


const editProduct = function (productId) {
    // Recupero i valori aggiornati dal form nel modal di modifica
    const nameInput = document.getElementById(`name-${productId}`);
    const descriptionInput = document.getElementById(`description-${productId}`);
    const brandInput = document.getElementById(`brand-${productId}`);
    const imageInput = document.getElementById(`imageUrl-${productId}`);
    const priceInput = document.getElementById(`price-${productId}`);

    const updatedProduct = new Product(
        nameInput.value,
        descriptionInput.value,
        brandInput.value,
        imageInput.value,
        priceInput.value
    );

    // Eseguo la richiesta PUT all'API
    fetch(endpoint + '/' + productId, {
        method: 'PUT',
        body: JSON.stringify(updatedProduct),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzY5MDc4Y2RkZjAwMTU1ZDY3YTgiLCJpYXQiOjE3NTIyMjEzMjgsImV4cCI6MTc1MzQzMDkyOH0.VIZlPEtimlRoj4jmZz3sAnni-A175JV_S-5tcBLAmeQ"
        }
    })
        .then((res) => {
            if (res.ok) {
                alert('Prodotto modificato con successo!');
                // Aggiorno la pagina
                location.assign('/dashboard.html')
            } else {
                throw new Error('Errore durante la modifica del prodotto', res.status);
            }
        })
        .catch((err) => {
            alert('ERRORE durante la modifica');
            console.log('ERRORE MODIFICA:', err);
        });
};


getProducts()

