const {app, BrowserWindow, Menu} = require('electron')
const {ipcMain} = require('electron')
const Annotation = require('./annotation.js');
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

var annotation = new Annotation()

function saveAs() {

	const {dialog} = require('electron')

	dialog.showSaveDialog(function (fileNames) {

		console.log(fileNames)

		// fileNames is an array that contains all the selected
		if(fileNames === undefined) {

			console.log("No file selected");
			return
		}
		else {

			let filename = Array.isArray(fileNames) ? fileNames[0] : fileNames
			annotation.save(filename);
		}
	});
}

function save() {

	if ( annotationFilePath ) {

		console.log("saving to " - annotationFilePath)
		annotation.save(annotation.filePath());
	}
	else {

		saveAs();
	}
}

function load() {

	const {dialog} = require('electron')

	// Prompt unsaved progress
	if ( !annotation.isSaved ) {

		var choice = dialog.showMessageBox(
			win,
			{
				type: 'question',
				buttons: ['Yes', 'No'],
				title: 'Save',
				message: 'Would you like to save the current file?'
			});

    	if ( choice === 0 ) {

			save();
		}
	}

	dialog.showOpenDialog(function (fileNames) {

		// fileNames is an array that contains all the selected
		if(fileNames === undefined) {

			console.log("No file selected");
		}
		else {

			let filename = Array.isArray(fileNames) ? fileNames[0] : fileNames
			annotation = Annotation.load(filename)

			console.log("Annotation after load " + annotation)
			console.log("Variables after load " + annotation.variables)

			win.webContents.send('annotationChanged')
		}
	});
}

function newAnnotation() {

	// Prompt unsaved progress
	if ( !isSaved ) {

		const {dialog} = require('electron')
		var choice = dialog.showMessageBox(
			win,
			{
				type: 'question',
				buttons: ['Yes', 'No'],
				title: 'Save',
				message: 'Would you like to save the current file?'
			});

    	if ( choice === 0 ) {

			save();
		}
	}

	annotation = new Annotation()

	win.webContents.send('annotationChanged')
}

function createWindow () {

	// Create the browser window.
 	win = new BrowserWindow({
		width: 800,
		height: 600,
		icon: path.join(__dirname, 'assets/icons/png/64x64.png')
	})

	win.openDevTools();

	const menuTemplate = [{
		label: 'File',
		submenu: [
			{label: 'New File', click: newAnnotation },
			{label: 'Open File...', click: load },
			{label: 'Save', click: save},
			{label: 'Save As...', click: saveAs },
			{label: 'Close File', click: newAnnotation },
		]
	},
	{
		role: 'help',
		submenu: [
			{label: 'Learn More', click () { require('electron').shell.openExternal('https://electron.atom.io') }}
		]
	}]

	const menu = Menu.buildFromTemplate(menuTemplate)
	Menu.setApplicationMenu(menu)

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
 	}))


	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	})
}

ipcMain.on('transitionMainWindow', (event, arg) => {

	// and load the index.html of the app.
	win.loadURL(url.format({
	  pathname: path.join(__dirname, arg),
	  protocol: 'file:',
	  slashes: true
	}))
})

ipcMain.on('getAnnotation', (event, path) => {

	event.returnValue = annotation
})

ipcMain.on('getAnnotationPath', (event, path) => {

	event.returnValue = annotationFilePath
})

ipcMain.on('isAnnotationSaved', (event, path) => {

	event.returnValue = isSaved
})

ipcMain.on('loadAnnotation', (event, path) => {

	load();
})

ipcMain.on('saveAnnotation', (event, path) => {

	save();
})

ipcMain.on('addVariableToAnnotation', (event, arg) => {

	if ( arg ) {

		annotation.variables.push(arg);
	}
})

ipcMain.on('addResourceGeneratorToAnnotation', (event, arg) => {

	if ( arg ) {

		annotation.resourceGenerators.push(arg);
	}
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {

	// On macOS it is common for applications and their menu bar
 	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {

		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {

		createWindow()
	}
})
