const { app, Menu } = require('electron')


const isMac = process.platform === 'darwin'

const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    {
        label: 'Home',
        submenu: [
            {
                label: 'Home',
                click: async () => {
                    const { win } = require('./main.js')
                    win.loadFile("main.html")
                }
            }]
    },
    {
        label: 'Administration',
        submenu: [
            {
                label: 'Insert/Borrar',
                click: async () => {
                    const { win } = require('./main.js')
                    win.loadFile("crud.html")
                }
            },
            {
                label: 'Modificar Coche',
                click: async () => {
                    const { win } = require('./main.js')
                    win.loadFile("modify.html")
                }
            }
        ]
    },
    {
        label: 'canvas',
        submenu: [
            {
                label: 'canvas',
                click: async () => {
                    const { win } = require('./main.js')
                    win.loadFile("canvas.html")
                }
            }]
    }
]

const menu = Menu.buildFromTemplate(template)
module.exports.menu = menu;
Menu.setApplicationMenu(menu)

