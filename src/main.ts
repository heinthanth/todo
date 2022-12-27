import { createRoot } from 'react-dom/client';
import App from './app';
import { StrictMode, createElement } from 'react';

const rootElement = createElement(StrictMode, {}, createElement(App));
createRoot(document.getElementById('root') as HTMLElement).render(rootElement);
