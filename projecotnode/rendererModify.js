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
         
          </tr>`;
    });
}
window.onload = (event) =>{
    productsList = document.getElementById("products");
    ipcRenderer.send('Canal3',"asd");


    document.getElementById("modificador").onsubmit= (e) => {
        e.preventDefault();
        console.log(document.getElementById("ProductCode").value);
        console.log(document.getElementById("ProductName").value);
        ipcRenderer.send('update',{
            "ProductCode":document.getElementById("ProductCode").value,
            "ProductName":document.getElementById("ProductName").value
        })       
    }

};

ipcRenderer.on('Canal4',(e,args)=> {
    renderProducts(args);
});

