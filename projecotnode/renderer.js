const { ipcRenderer } = require('electron');
let $ = {jQuery} = require('jquery');
ipcRenderer.send("channel1", "Ready")





ipcRenderer.on('Cannal2', (e, args) => {
  let respuesta = $('#resposta');
    for (let i = 0; i < args.length; i++) {
        let cuadrogrande = $(`<div id='cuadrogrande'></div>`);
        let titulo = $(`<div id='titol'>  ${args[i].productName}</div>`);
        let contenedorImagenGrande = $(`<div id='contieneimagen'></div>`);
        let imagen = $(`<div id='imagen'><img id='imtge' src="  ${args[i].imageURL} " width='400' height='300'/>`);
        let descripcion = $(` <div id='descripcion'>  ${args[i].productDescription}  </div>`);
        let cantidad = $(`<div id='quantity'>  Stock:  ${args[i].quantityInStock}  </div>`);
        let price = $(`<div id='price'>  Price:  ${args[i].buyPrice}  </div> `);
        respuesta.append(cuadrogrande.append(titulo,contenedorImagenGrande.append(imagen),descripcion,cantidad,price));
    }
});

function pdf()
{
    ipcRenderer.send("pdf","pdf");
}


function pdf2()
{
    ipcRenderer.send("pdf2","pdf");
}

