let idCarrito = 1

loadCart(idCarrito)
renderTotal()


const carrito = document.getElementById('carrito')

//Trae el carrito del usuario indicado.
async function loadCart() {
    await fetch(`/api/carritos/${idCarrito}/productos`)
    .then(data => data.json())
    // .then(data => console.log(data.data))
    .then(data => {renderProducts(data.data[0].productos)})
    
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
    carrito.innerHTML += `
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
                    <button class="btn btn-dark option-icon bi bi-dash-circle removeProd"></button>
                </div>
                </div>
            </div>
        </li>
    `
}

//Escuchador de eventos del carrito.
carrito.addEventListener('click', async(e)=>{
    //Elimina productos del carrito.
    if(e.target.className.includes('removeProd')){
        try {
            const idProd = e.target.parentNode.parentNode.parentNode.parentNode.id
            console.log(idProd);

            await fetch(`api/carritos/${idCarrito}/productos/${idProd}`,{method:'DELETE'})
            e.target.parentNode.parentNode.parentNode.parentNode.remove()
            renderTotal()
        } catch (error) {
            console.log(error);
        }
    }
})

//Resumen del carrito
async function renderTotal() {
    const span = document.getElementById('total')
    const data = await fetch(`api/carritos/${idCarrito}/productos`)
    const Carrito = await data.json()
    const productos = Carrito.data[0].productos
    let total = 0
    productos.forEach(prod => {
        total += prod.price
    });
    total = total.toLocaleString('en-US')
    span.innerHTML = `$${total}`
}
