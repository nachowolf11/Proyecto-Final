const prodContainer = document.getElementById('prodContainer')

//Renderiza un producto al html
function renderNewProduct(product) {
    prodContainer.innerHTML += `
        <li class="col-12" id="${product.id}">
            <div class="row g-0">
                <div class="col-6"><img src="${product.url}" alt=""></div>
                <div class="col-6 d-flex flex-column">
                    <div class="text-big">${product.name}</div>
                    <div class="d-none">${product.id}</div>
                    <div class="d-none">${product.description}</div>
                    <div class="fw-bold text-big">$${product.price}</div>
                    <div class="d-none">${product.code}</div>
                    <div class="d-flex flex-row justify-content-between text-sm">Stock: ${product.stock}</div>
                    <div class="align-self-end mt-3">
                        <button class="btn btn-warning bi bi-pencil-square editProd" data-bs-toggle="modal" data-bs-target="#editProduct"></button>
                        <button class="btn btn-danger bi bi-trash deleteProd"></button>
                    </div>
                </div>
            </div>
        </li>
    `
}

//Renderiza muchos productos
function renderProducts(data) {
    if (data.length > 0) {
        data.forEach(product => {
            renderNewProduct(product)
        });
    }
}

//Trae los productos de la base
function loadProducts() {
    fetch('/api/productos')
        .then(data => data.json())
        .then(data => {renderProducts(data.data)})
}

loadProducts();

//Funcion para que se elimine el producto segun el boton que toques.
prodContainer.addEventListener('click',(e)=>{
    if(e.target.className.includes('deleteProd')){
        const idProd = e.target.parentNode.parentNode.parentNode.parentNode.id
        e.target.parentNode.parentNode.parentNode.parentNode.remove()
        fetch(`api/productos/${idProd}`,{method:'DELETE'})
    }
    if (e.target.className.includes('editProd')) {
        const idProd = e.target.parentNode.parentNode.parentNode.parentNode.id
        fetch(`/api/productos/${idProd}`)
            .then(data => data.json())
            .then(data => renderEditForm(data.data))
    }
})

//Añade un nuevo producto recibido desde el front.
function sendFormProduct() {
    const formProduct = document.getElementById('formProduct')
    const formData = new FormData(formProduct)
    const product = {
        name:formData.get('name'),
        description:formData.get('description'),
        code:formData.get('code'),
        url:formData.get('url'),
        price:formData.get('price'),
        stock:formData.get('stock')
    }
    fetch('api/productos',{
        method:'POST',
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(product)
    })
    location.reload()
}

//Edita productos mediante informacion recibida desde el front.
function sendFormEditProduct() {
    const formProduct = document.getElementById('formEditProduct')
    const formData = new FormData(formProduct)
    const product = {
        name:formData.get('name'),
        description:formData.get('description'),
        code:formData.get('code'),
        url:formData.get('url'),
        price:formData.get('price'),
        stock:formData.get('stock')
    }
    fetch(`api/productos/${formProduct.idProd}`,{
        method:'PUT',
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(product)
    })
    location.reload()
}

//Renderiza el formulario para editar un producto.
function renderEditForm(product) {
    const form = document.getElementById('formEditProduct')
    form.idProd = product.id
    form.innerHTML = `
    <input type="text" name="name" id="name" placeholder="Nombre" value="${product.name}">
    <input type="text" name="description" id="description" placeholder="Descripción" value="${product.description}">
    <input type="text" name="code" id="code" placeholder="Código" value="${product.code}">
    <input type="text" name="url" id="url" placeholder="URL Imagen" value="${product.url}">
    <input type="number" name="price" id="price" placeholder="Precio" value="${product.price}">
    <input type="number" name="stock" id="stock" placeholder="Stock" value="${product.stock}">
    `
}

