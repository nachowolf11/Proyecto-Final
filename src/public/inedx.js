const isAdmin = true
const idUser = 1

loadProducts()

const prodContainer = document.getElementById('prodContainer')


//Oculta las opciones de Administrador
function hideAdminOptions() {
    if (isAdmin == false) {
        const adminOptions = document.getElementsByClassName('admin')
        for (let i = 0; i < adminOptions.length; i++) {
            adminOptions[i].style.visibility = 'hidden'
        }
    }
}


//Trae los productos de la base
async function loadProducts() {
    await fetch('/api/productos')
        .then(data => data.json())
        .then(data => {renderProducts(data.data,prodContainer)})
        .then(hideAdminOptions(isAdmin))
}

//Renderiza muchos productos
function renderProducts(data) {
    if (data.length > 0) {
        data.forEach(product => {
            renderNewProduct(product)
        });
    }
}

//Renderiza un producto al html
async function renderNewProduct(product,container) {
    prodContainer.innerHTML += `
        <li class="col-12 border-bottom" id="${product.id}">
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
                        <button class="btn btn-warning option-icon bi bi-pencil-square editProd admin" data-bs-toggle="modal" data-bs-target="#editProduct"></button>
                        <button class="btn btn-danger option-icon bi bi-trash deleteProd admin"></button>
                        <button class="btn btn-dark option-icon bi bi-plus-circle addToCart"></button>
                    </div>
                </div>
            </div>
        </li>
    `
    //Funcion que oculta la opciones para administradores. La puse aca porque necesita ejecutarse luego de crearse el html de los prods
    hideAdminOptions()
}




//Escuchador de eventos del contenedor de productos.
prodContainer.addEventListener('click',async (e)=>{
    //Elimina productos.
    if(e.target.className.includes('deleteProd')){
        try {
            const idProd = e.target.parentNode.parentNode.parentNode.parentNode.id
            await fetch(`api/productos/${idProd}`,{method:'DELETE'})
            e.target.parentNode.parentNode.parentNode.parentNode.remove()
        } catch (error) {
            console.log(error);   
        }
    }
    //Edita productos.
    if (e.target.className.includes('editProd')) {
        const idProd = e.target.parentNode.parentNode.parentNode.parentNode.id
        await fetch(`/api/productos/${idProd}`)
            .then(data => data.json())
            .then(data => renderEditForm(data.data[0]))
    }
    //Agrega productos al carrito.
    if(e.target.className.includes('addToCart')){
        const idProd = e.target.parentNode.parentNode.parentNode.parentNode.id
        await fetch(`api/carritos/${idUser}/productos`,{
            method:'POST',
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({id:idProd})
        })
        const snackbar = document.getElementById('snackbar')
        snackbar.classList.add('show')
        setTimeout(() => {
            snackbar.classList.remove('show')
        }, 2000);
    }
})

//Añade un nuevo producto recibido desde el front.
async function sendFormProduct() {
    const formProduct = document.getElementById('formProduct')
    const formData = new FormData(formProduct)
    const product = {
        id:formData.get('id'),
        name:formData.get('name'),
        description:formData.get('description'),
        code:formData.get('code'),
        url:formData.get('url'),
        price:formData.get('price'),
        stock:formData.get('stock')
    }
    await fetch('api/productos',{
        method:'POST',
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
    <input type="text" name="id" id="id" placeholder="ID" value="${product.id}">
    <input type="text" name="name" id="name" placeholder="Nombre" value="${product.name}">
    <input type="text" name="description" id="description" placeholder="Descripción" value="${product.description}">
    <input type="text" name="code" id="code" placeholder="Código" value="${product.code}">
    <input type="text" name="url" id="url" placeholder="URL Imagen" value="${product.url}">
    <input type="number" name="price" id="price" placeholder="Precio" value="${product.price}">
    <input type="number" name="stock" id="stock" placeholder="Stock" value="${product.stock}">
    `
}

//Edita productos mediante informacion recibida desde el formulario de edición de producto.
async function sendFormEditProduct() {
    const formProduct = document.getElementById('formEditProduct')
    const formData = new FormData(formProduct)
    const product = {
        id:formData.get('id'),
        name:formData.get('name'),
        description:formData.get('description'),
        code:formData.get('code'),
        url:formData.get('url'),
        price:formData.get('price'),
        stock:formData.get('stock')
    }
    await fetch(`api/productos/${formProduct.idProd}`,{
        method:'PUT',
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify(product)
    })
    location.reload()
}

//Logout
const btnLogout = document.getElementById('logout')
btnLogout.onclick = async () => {
    location.reload()
    await fetch('logout')
}

//Obtener data del usuario
async function getDataUser() {
    await fetch('session')
    .then(data => data.json())
    .then(data => renderDataUser(data.user))
}
getDataUser()

//Renderizar nombre del usuario
function renderDataUser(data) {
    console.log(data);
    if (data) {
    document.getElementById('userContainer').innerHTML = `Hola ${data.username} `
    }
}