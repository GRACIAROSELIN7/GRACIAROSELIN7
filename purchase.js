let products = [];

async function pageload() {
    document.getElementById('txtUser').textContent = sessionStorage.display_name;
    const param = { user_id: sessionStorage.user_id };
    
    const _Product = await api('Purchase_Controller/getProduct', param);
    products = _Product.data; // Correct assignment
    renderProducts(products); // Ensure you call renderProducts with all products

    document.getElementById('totalValue').textContent = products.reduce((total, item) => total + (item.count * item.price), 0);
}

function filterProducts() {
    const priceFilter = document.querySelector('input[name="price"]:checked');
    const brandFilter = document.querySelector('input[name="brand"]:checked');
    
    const filteredProducts = products.filter(item => {
        let priceCondition = true;
        let brandCondition = true;

        if (priceFilter) {
            const priceRange = priceFilter.id;
            priceCondition = (priceRange === 'price1' && item.price <= 100) ||
                             (priceRange === 'price2' && item.price > 100 && item.price <= 500) ||
                             (priceRange === 'price3' && item.price > 500 && item.price <= 1000) ||
                             (priceRange === 'price4' && item.price > 1000 && item.price <= 10000) ||
                             (priceRange === 'price5' && item.price > 10000);
        }

        if (brandFilter) {
            const selectedBrand = brandFilter.id.replace('brand', '');
            brandCondition = item.brandId === selectedBrand; // Make sure brandId is correct
        }

        return priceCondition && brandCondition;
    });

    renderProducts(filteredProducts);
}

async function purchaseProduct(id) {
    const param = { id: id };
    const res = await api('Purchase_Controller/purchase', param);
    
    if (res.success) {
        alert('Purchase successful!');
        await pageload();
    } else {
        alert('Purchase failed. Please try again.');
    }
}

function renderProducts(filteredProducts) {
    const productElements = filteredProducts.map(item => {
        return `<div class="table-row">
                    <div class="table-data"><img src="${item.img}" alt="img" width="40px" /></div>
                    <div class="table-data">${item.name}</div>
                    <div class="table-data">${item.count}</div>
                    <div class="table-data">${item.price}</div>
                    <div class="table-data"><button onclick="purchaseProduct(${item.id})">Purchase</button></div>
                </div>`;
    });
    document.getElementById('products').innerHTML = productElements.join("");
}
