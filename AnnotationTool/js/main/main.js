'use strict';
const electron = require('electron');
const path = require('path')

const app = electron.app;

// Prevent window being garbage collected
let mainWindow;
let resourcePath = path.dirname(path.dirname(__dirname))

function onClosed() {

	// Dereference the window
	// For multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {

	const win = new electron.BrowserWindow({
		width: 1000,
		height: 800,
		icon: path.join(resourcePath, 'assets', 'icons', 'png', '64x64.png')
	});

	win.resourcePath = resourcePath
	win.loadURL(path.join(resourcePath, 'html', 'index.html'));
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {

	if (process.platform !== 'darwin') {

		app.quit();
	}
});

app.on('activate', () => {

	if (!mainWindow) {

		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {

	mainWindow = createMainWindow();
});
