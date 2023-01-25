const { app, BrowserWindow, ipcMain, electron } = require("electron");
const { connection } = require("./connection");
let win;

function createWindow() {
  const win = new BrowserWindow({
    height: 800,
    width: 600,
    maximizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: "My App",
  });
  win.loadFile("main.html");
  win.setTitle("My App");
  win.openDevTools;
  win.webContents.openDevTools();
  const { menu } = require("./menu");
  module.exports.win = win;
}

app.whenReady().then(createWindow,cargarConexion);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function cargarConexion()
{
  connection.connect(function (err) {});
}

function peticion() {
  return new Promise((resolve, reject) => {
      connection.query(
        'select productCode,productName,productDescription,quantityInStock,buyPrice,imageURL from products where productLine = "Rental" ;',
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          return resolve(elements);
        }
      );
    });
}


function peticion2() {
  return new Promise((resolve, reject) => {
      connection.query(
        "select productLine as linea, count(productCode)as Code  from products group by productLine;",
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          return resolve(elements);
        }
      );
    });
}

function peticion3() {
  return new Promise((resolve, reject) => {
      connection.query(
        "select productLine as linea, count(productCode)as Code  from products group by productLine;",
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          return resolve(elements);
        }
      );
    });
}

function peticion4() {
  return new Promise((resolve, reject) => {
      connection.query(
        "select productLine as linea, count(productCode)as Code  from products group by productLine;",
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          return resolve(elements);
        }
      );
    });
}

async function getProducts() {
  const customPromise = new Promise((resolve, reject) => {
    connection.query(
      "select productCode,productName,productDescription,quantityInStock,buyPrice,imageURL from products where imageURL is not null order by productCode",
      function (err, result, fields) {
        if (err) throw err;
        resolve(result);
      }
    );
  });

  return customPromise;
}

async function borrarProduct(id) {
  connection.query(
    'delete from products where productCode = "' + id + '";',
    function (err, result, fields) {
      if (err) throw err;
    }
  );
}

function insert(coche)
{
     connection.query("insert into products values('"+ coche.ProductCode +"','"+coche.ProductName+"','"+coche.ProductLine+"','"+coche.ProductScale+"','"+coche.ProductVendor+"','"+coche.ProductDescription+
     "',"+coche.QuantityStock+",'"+coche.BuyPrice+"',"+coche.MSRP+",'"+coche.ImageURL+"');")
}

function modificar(info)
{
  connection.query("update products set productName = '" +info.ProductName +"' where productCode = '"+ info.ProductCode + "';");
  console.log(info.ProductCode + "desde cambiar");
  console.log(info.ProductName + "desde cambiar");
}


ipcMain.on("Canal3", (e, args) => {
  getProducts()
    .then((data) => {
      e.sender.send("Canal4", data);
    })
    .catch((err) => {
      console.log(err);
    });
});

ipcMain.on("channel1", (e, args) => {
  peticion()
    .then((data) => {
      e.sender.send("Cannal2", data);
    })
    .catch((err) => {
      console.log(err);
    });
});

ipcMain.on("canvas", (e, args) => {
 console.log(args);
peticion2().then((data)=>{e.sender.send("canvas2", data)})
});

ipcMain.on("Delete", (e, args) => {
  console.log(args);
  borrarProduct(args);
  getProducts()
    .then((data) => {
      e.sender.send("Canal4", data);
    })
    .catch((err) => {
      console.log(err);
    });
});

ipcMain.on("insert", (e, args) => {
    insert(args);
    getProducts()
    .then((data) => {
      e.sender.send("Canal4", data);
    })
    .catch((err) => {
      console.log(err);
    });
  });


ipcMain.on("update", (e, args) => {
  console.log(args + "desde el main");
  modificar(args);
  getProducts()
    .then((data) => {
      e.sender.send("Canal4", data);
    })
    .catch((err) => {
      console.log(err);
    });
});


ipcMain.on("pdf", (e, args) => {
const path = require('path');
const fs = require('fs');
var filepath1 = path.join(__dirname, 'paginaPropia.pdf');

var options = {
	marginsType: 0,
	pageSize: 'A4',
	printBackground: true,
	printSelectionOnly: false,
	landscape: false
}

  const {win} = require("./main.js") 

	win.webContents.printToPDF(options).then(data => {
		fs.writeFile(filepath1, data, function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log('PDF Generated Successfully');
			}
		});
	}).catch(error => {
		console.log(error)
	});
});


ipcMain.on("pdf2", (e, args) => {
const path = require('path');
const fs = require('fs');

var filepath2 = path.join(__dirname, 'pdfOnline.pdf');

var options2 = {
	marginsType: 0,
	pageSize: 'A5',
	printBackground: true,
	printSelectionOnly: false,
	landscape: false
}


	let win = new BrowserWindow({
		show: true,
		webPreferences: {
		nodeIntegration: true
		}
	});


	win.loadURL('https://www.twitch.tv/');
  
	win.webContents.on('did-finish-load', () => {
		win.webContents.printToPDF(options2).then(data => {
			fs.writeFile(filepath2, data, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log('PDF Generated Successfully');
				}
			});
		}).catch(error => {
			console.log(error)
		});
	});
});



ipcMain.on("canvas", (e, args) => {
  console.log(args);
 peticion2().then((data)=>{e.sender.send("canvas3", data)})
 });


 ipcMain.on("newquery", (e, args) => {
  console.log(args);
  peticionmasventas().then((data)=>{e.sender.send("querymasventas", data)})
 });
 
 ipcMain.on("newquery", (e, args) => {
  console.log(args);
  peticion2().then((data)=>{e.sender.send("querymasdineros", data)})
 });

 
 ipcMain.on("newquery", (e, args) => {
  console.log(args);
  peticion2().then((data)=>{e.sender.send("querymenosventas", data)})
 });


 function peticionmasventas() {
  return new Promise((resolve, reject) => {
      connection.query(
        "select productLine as linea, count(productCode)as Code  from products group by productLine;",
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          return resolve(elements);
        }
      );
    });
}

function peticionmasdineros() {
  return new Promise((resolve, reject) => {
      connection.query(
        "select productLine as linea, count(productCode)as Code  from products group by productLine;",
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          return resolve(elements);
        }
      );
    });
}

function peticiomenosdineros() {
  return new Promise((resolve, reject) => {
      connection.query(
        "select productLine as linea, count(productCode)as Code  from products group by productLine;",
        (error, elements) => {
          if (error) {
            return reject(error);
          }
          return resolve(elements);
        }
      );
    });
}