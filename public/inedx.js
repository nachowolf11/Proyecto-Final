function renderNewProduct(product) {
    const prodContainer = document.getElementById('prodContainer')
    prodContainer.innerHTML += `
        <li class="col">
            <div class="row g-0">
                <div class="col-6"><img src="https://cdn-icons-png.flaticon.com/512/68/68761.png" alt=""></div>
                <div class="col-6 d-flex flex-column">
                    <div class="text-big">${product.name}</div>
                    <div class="d-none">${product.id}</div>
                    <div class="d-none">${product.description}</div>
                    <div class="fw-bold text-big">${product.price}</div>
                    <div class="d-none">${product.code}</div>
                    <div class="d-flex flex-row justify-content-between text-sm">
                        <div>Stock: ${product.stock}</div>
                        <div>${product.timestamp}</div>
                    </div>
                    <div class="align-self-end mt-3">
                        <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>
        </li>
    `
}