import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

function Other() {
    return (
        <div>Other</div>
    )
}

const app = createRoot(document.getElementById('app'));
app.render(<App />);

const other = createRoot(document.getElementById('other'));
other.render(<Other />);