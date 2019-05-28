import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import config from './aws-exports';
import Amplify from 'aws-amplify';

Amplify.configure(config);
Amplify.configure({
    Interactions: {
        bots: {
            "thanhBot": {
                "name": "thanhBot",
                "alias": "thanhBot",
                "region": "us-east-1"
            }
        }
    }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
