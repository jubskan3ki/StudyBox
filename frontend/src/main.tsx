import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '~/store';

import App from './App.tsx';
import './styles/tailwind.css';
import './styles/index.css';
import './config/chartConfig.ts';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <StrictMode>
                <App />
            </StrictMode>
        </Provider>
    </BrowserRouter>
);
