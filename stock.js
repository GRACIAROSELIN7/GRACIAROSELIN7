
async function pageload() {
    document.getElementById('stocktable').innerHTML = sessionStorage.display_name;
    const param = {};
    
    const stockItems = await api('Stock_Controller/get', param);
    get();
    const_stockItems.map((item, i) => {
        return ` <div class="table-row">
                    <div class="table-data">${item.stock_id}</div>
                    <div class="table-data">${item.name}</div>
                    <div class="table-data">${item.quantity}</div>
                    <div class="table-data">${item.price}</div>
                    <div class="table-data"><button onclick="showUpdateModel(${item.stock_id},${item.name},${item.quantity},${item.price})">Update</button>
                    <button onclick="deleteStock(${item.stock_id})">Delete</button></div>
                </div>
                    `.join('');
    });
    async function addStock(){
        const name=
    document.getElementById('newStock Name').value;
    const quantity=
    document.getElementById('newStock Quantity').value;
    const price=
    document.getElementById('newStock Price').value;
    if(!name||!quantity||!price){
        return alert('All fields are required');
    }
    const param = {
        name:name,
        quantity:parseInt(quantity),
        price:parseFloat(price)};
    };
    await api('Stock_Controller/post', param);
    loadStock();
}
async function updateStock(id){
    const quantity= 
    document.getElementById('updatesStockQuantity').value;
        if(!quantity){
            return alert('Quantity is required');
        }
    const param ={
        id:id,
        quantity:parseInt(quantity)
    };
     await api('Stock_Controller/put', param);
     closedUpdateModal();
    loadStock();
}
    
async function deleteStock(id) {
    const param = {
        id: id
    };
    const res = await api('Stock_Controller/delete', param);
    loadStock();

}
function showUpdateModal(id,name,qunatity,price){
    document.getElementById('updateStockId').value=id;
    document.getElementById('updateStockName').value=name;
    document.getElementById('updateStockQuantity').value=quantity;
    document=getElementById('updateStockPrice').value=price;
    document.getElementById('updateModal').style.display='block';

}
function closedUpdateModal(){
    document.getElementById('updateModal').style.display='none';
}

