import { configureGlobal } from 'gather-style';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

configureGlobal();

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
