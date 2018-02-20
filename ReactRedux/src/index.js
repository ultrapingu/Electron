// import GoldenLayoutWrapper from './components/GoldenLayoutWrapper';
// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
// import reducer from './reducers/index'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// //import {setState} from './ActionCreators';
//
// import '../css/main.css';
//
// const store = createStore(reducer);
// // store.dispatch(setState({ 'count': 10 }));
// // console.log(store.getState())
//
// const App = () => (
//
// 	<Provider store={store}>
// 		<MuiThemeProvider muiTheme={getMuiTheme()}>
// 			<GoldenLayoutWrapper />
// 		</MuiThemeProvider>
// 	</Provider>
// );
//
// ReactDOM.render(
// 	<App/>,
// 	document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/index'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './components/material-test';

import {MetadataViewContainer} from './components/metadata-view';

const store = createStore(reducer);

const App = () => (
	<Provider store={store}>
		<MuiThemeProvider>
			<MetadataViewContainer />
		</MuiThemeProvider>
	</Provider>
);

ReactDOM.render(
	<App />,
 	document.getElementById('root')
);
