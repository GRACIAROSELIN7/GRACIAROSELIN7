
// const _Product = [
//     {
//         id: 1,
//         name: "Samasung A/C",
//         Description: "Air conditioning (AC) is a system that regulates the temperature, humidity, and air quality in an enclosed space",
//         price: 1000,
//         delivery: 'Free Delivery',
//         rating: 5,
//         img: './images/samsung-3-star-ac.jpg',
//         count: 1,
//         tax: 28
//     },
//     {
//         id: 2,
//         name: "Samasung A/C",
//         Description: "Air conditioning (AC) is a system that regulates the temperature, humidity, and air quality in an enclosed space",
//         price: 1000,
//         delivery: 'Free Delivery',
//         rating: 5,
//         img: './images/samsung-3-star-ac.jpg',
//         count: 1,
//         tax: 5
//     },
//     {
//         id: 3,
//         name: "Samasung A/C",
//         Description: "Air conditioning (AC) is a system that regulates the temperature, humidity, and air quality in an enclosed space",
//         price: 1000,
//         delivery: 'Free Delivery',
//         rating: 5,
//         img: './images/samsung-3-star-ac.jpg',
//         count: 1,
//         tax: 10
//     },
//     {
//         id: 3,
//         name: "Samasung A/C",
//         Description: "Air conditioning (AC) is a system that regulates the temperature, humidity, and air quality in an enclosed space",
//         price: 1000,
//         delivery: 'Free Delivery',
//         rating: 5,
//         img: './images/samsung-3-star-ac.jpg',
//         count: 1,
//         tax: 12
//     }
// ];

let _Product=[];
async function pageload() {
    document.getElementById('txtUser').innerHTML = sessionStorage.display_name;
    const param = {
        user_id: sessionStorage.user_id
    }
    _Product = await api('Cart_Controller/getCartProduct', param);
    getCart();
    const _pr = _Product.map((item, i) => {
        return ` <div class="table-row">
                    <div class="table-data"><img src="${item.img}" alt="img" width="40px" /></div>
                    <div class="table-data">${item.name}</div>
                    <div class="table-data">${item.count}</div>
                    <div class="table-data">${(+item.price).toFixed(2)}</div>
                    <div class="table-data">${((item.tax * (item.count * (+item.price))) / 100).toFixed(2)}</div>
                    <div class="table-data">${(((item.tax * (item.count * (+item.price))) / 100) + (+item.price)).toFixed(2)}</div>
                    <div class="table-data"><input type="button" value="Delete" onclick="removeCart(${item.id})" style="margin:5px" /></div>
                </div>
                    `
    });
    document.getElementById('cart').innerHTML = _pr.join("");
    document.getElementById('totalValue').innerHTML = _Product.reduce((total, item) => {
        const price = +item.count * (+item.price);
        const tax = (+item.tax * (+item.count * (+item.price))) / 100;
        return total + (tax + price)
    }, 0).toFixed(2);
    document.getElementById('totalTax').innerHTML = _Product.reduce((total, item) => {
        const tax = (+item.tax * (+item.count * (+item.price))) / 100;
        return total + (tax)
    }, 0).toFixed(2);

}

async function getCart() {
    const param = {
        user_id: sessionStorage.user_id
    }
    const res = await api('Cart_Controller/get', param);
    document.getElementById("cartId").innerHTML = res.length;

}

async function removeCart(id) {
    const param = {
        id: id
    }
    const res = await api('Cart_Controller/delete', param);

    pageload();
}


function openInvoice() {
    document.getElementById("invoicePopup").className = "ipopup popupOpen";
    invocie();
}


function closeInvoice() {
    document.getElementById("invoicePopup").className = "ipopup popupClose";
}

function invocie() {
    const _pr = _Product.map((item, i) => {
        return ` <tr>
                    <td>${item.name}</td>
                    <td>${item.count}</td>
                    <td class="rightText">${(+item.price).toFixed(2)}</td>
                    <td class="rightText">${((item.tax * (item.count * (+item.price))) / 100).toFixed(2)}</td>
                    <td class="rightText">${(((item.tax * (item.count * (+item.price))) / 100) + (+item.price)).toFixed(2)}</td>
                </tr>`
    });
    document.getElementById('invoiceBody').innerHTML = _pr.join("") + `<tr><td style="height:100px"></td><td></td><td></td><td></td><td></td></tr>`;

    const _totalValue = _Product.reduce((total, item) => {
        const price = +item.count * (+item.price);
        const tax = (+item.tax * (+item.count * (+item.price))) / 100;
        return total + (tax + price)
    }, 0).toFixed(2);
    const _totalTax = _Product.reduce((total, item) => {
        const tax = (+item.tax * (+item.count * (+item.price))) / 100;
        return total + (tax)
    }, 0).toFixed(2);
    const _total = _Product.reduce((total, item) => {
        const price = +item.count * (+item.price);
        return total + (price)
    }, 0).toFixed(2);

    document.getElementById('invoiceTotal').innerHTML = `<tr>
                            <td colspan="2">Total</td>
                            <td class="rightText">${_total}</td>
                            <td class="rightText">${_totalTax}</td>
                            <td class="rightText">${_totalValue}</td>
                        </tr>`;


    document.getElementById('deliveryDiv').innerHTML = `<b>Delivery To:-</b>
                                <br/>
                                <b>${document.getElementById('txtName').value}</b>
                                <div style="padding: 5px;">${document.getElementById('txtAddress').value}</div>
                                <div style="padding: 5px;"><b>Phone:</b>${document.getElementById('txtContactNumber').value}</div>`

}

function downloadInvoice() {
    kendo.drawing.drawDOM(document.getElementById('invocieDiv'), {

        multiPage: true,
        paperSize: "A4",
        scale: 0.8
    }).then(function (group) {
        kendo.drawing.pdf.saveAs(group, "Invoice.pdf");
    });
   

}