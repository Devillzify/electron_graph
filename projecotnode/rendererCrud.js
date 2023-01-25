const { ipcRenderer } = require("electron");

let products;
let productsList;


function renderProducts(tasks) {
    productsList.innerHTML = ``;
    tasks.forEach((t) => {
        productsList.innerHTML += `
          <tr>
            <th scope="row">${t.productCode}</th>
            <td>${t.productName}</td>
            <td>${t.productDescription}</td>
            <td>${t.quantityInStock}</td>
            <td>${t.buyPrice}</td>
            <td><img class="imatges" src="${t.imageURL}"/></td>
            <td><button type="button" class="btn btn-danger" onclick="borrarId('${t.productCode}')">Delete</button></td>
          </tr>`;
    });
}



function borrarId(id)
{
    console.log("la id esta aqui" + id)
    ipcRenderer.send('Delete',id)
}


window.onload = (event) =>{
    productsList = document.getElementById("products");
    ipcRenderer.send('Canal3',"asd");


    document.getElementById("formulario").onsubmit= (e) => {
        e.preventDefault();

        ipcRenderer.send('insert',{
            "ProductCode":document.getElementById("ProductCode").value,
            "ProductName":document.getElementById("ProductName").value,
            "ProductLine":document.getElementById("ProductLine").value,
            "ProductScale":document.getElementById("ProductScale").value,
            "ProductVendor":document.getElementById("ProductVendor").value,
            "ProductDescription":document.getElementById("ProductDescription").value,
            "QuantityStock":document.getElementById("QuantityStock").value,
            "BuyPrice":document.getElementById("BuyPrice").value,
            "MSRP":document.getElementById("MSRP").value,
            "ImageURL":document.getElementById("ImageURL").value
        })       
    }

};

ipcRenderer.on('Canal4',(e,args)=> {
    console.log(args);
    renderProducts(args);
});