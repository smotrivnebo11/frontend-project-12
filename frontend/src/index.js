// import ReactDOM from 'react-dom/client';
// import init from './init.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

// const app = async () => {
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(await init());
// };

// app();

/* eslint-disable functional/no-expression-statements */
import { io } from 'socket.io-client';
import './index.css';

import initApp from './init.jsx';

const socket = io();

initApp(socket);
