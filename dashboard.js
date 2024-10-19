
// const _Product = [
//     {
//         id: 1,
//         name: "Samasung A/C",
//         Description: "Air conditioning (AC) is a system that regulates the temperature, humidity, and air quality in an enclosed space",
//         price: 1000,
//         delivery: 'Free Delivery',
//         rating: 5,
//         img:'./images/samsung-3-star-ac.jpg'
//     },
//     {
//         id: 2,
//         name: "Samasung A/C",
//         Description: "Air conditioning (AC) is a system that regulates the temperature, humidity, and air quality in an enclosed space",
//         price: 1000,
//         delivery: 'Free Delivery',
//         rating: 5,
//         img:'./images/samsung-3-star-ac.jpg'
//     },
//     {
//         id: 3,
//         name: "Samasung A/C",
//         Description: "Air conditioning (AC) is a system that regulates the temperature, humidity, and air quality in an enclosed space",
//         price: 1000,
//         delivery: 'Free Delivery',
//         rating: 5,
//         img:'./images/samsung-3-star-ac.jpg'
//     },
//     {
//         id: 3,
//         name: "Samasung A/C",
//         Description: "Air conditioning (AC) is a system that regulates the temperature, humidity, and air quality in an enclosed space",
//         price: 1000,
//         delivery: 'Free Delivery',
//         rating: 5,
//         img:'./images/samsung-3-star-ac.jpg'
//     }
// ];


async function pageload() {
    document.getElementById('txtUser').innerHTML = sessionStorage.display_name;
    const param = {
        id: 0
    }
    const _Product = await api('Product_Controller/getshopping', param);
    getCart();
    const _pr = _Product.map((item, i) => {
        return `<li>
            <img src="${item.img}" alt="img" width="200px" height="200px" />
            <div>${item.name}</div>
            <hr>
                <p>&#8377; ${item.price} + <span style="font-size:12px">${item.tax}% GST<span></p>
                <p>${item.delivery}</p>
                <div> 
                    <span> <span class="fa fa-star ${+item.rating>=1?"checked":""}"></span><span class="fa fa-star ${+item.rating>=2?"checked":""}"></span><span class="fa fa-star ${+item.rating>=3?"checked":""}"></span><span class="fa fa-star ${+item.rating>=4?"checked":""}"></span><span class="fa fa-star ${+item.rating>=5?"checked":""}"></span></span> 
                    <input type="button" value="Add Review" onclick="openReview(${item.id})" style="margin:5px" />
                </div>
                <button onclick="addCart(${item.id})">Add to Cart</button>
        </li>`
    });
    document.getElementById('product').innerHTML = _pr.join("");

}

async function getCart() {
    const param = {
        user_id: sessionStorage.user_id
    }
    const res = await api('Cart_Controller/get', param);
    document.getElementById("cartId").innerHTML = res.length;

}

async function addCart(product_id) {
    const param = {
        product_id: product_id,
        user_id: sessionStorage.user_id,
        count: 1
    }
    await api('Cart_Controller/post', param);
    getCart();
}

function openReview(id) {
    document.getElementById("reviewPopup").className = "popup popupOpen";
    pageReviewload(id);
}


function closeReview() {
    pageload();
    document.getElementById("reviewPopup").className = "popup popupClose";
}