import { configureGlobal } from 'gather-style';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

configureGlobal();

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

// const token = localStorage.getItem('token');

// if (!token) {
//   localStorage.setItem('token', 'myToken');
//   console.info('Setting token');
// }

// console.info('Token', token);

// interface IRequester {
//   name: string;
// }
// client
//   .get('ticket.requester')
//   .then((requester: IRequester) => console.log(requester));
