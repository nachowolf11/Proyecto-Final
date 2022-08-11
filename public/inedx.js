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
                    <div class="fw-bold text-big">${product.price}</div>
                    <div class="d-none">${product.code}</div>
                    <div class="d-flex flex-row justify-content-between text-sm">Stock: ${product.stock}</div>
                    <div class="align-self-end mt-3">
                        <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-square"></i></button>
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
})