import { createRoot } from 'react-dom/client';
import App from './App'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; 
import './index.css';


const store = createStore(() => [], {}, applyMiddleware());
const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);