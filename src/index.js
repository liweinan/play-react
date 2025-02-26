import React, {Fragment} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

function Other() {
    return (
        <div>Other</div>
    )
}

function Two() {
    return (
        <div>Two</div>
    )
}

function Third() {
    return (
        <div>Third</div>
    )
}

function TheFrag() {
    return (
        <Fragment>
            <Two />
            <Third />
        </Fragment>
    )
}

const app = createRoot(document.getElementById('app'));
app.render(<App />);

const other = createRoot(document.getElementById('other'));
other.render(<Other />);

const theFrag = createRoot(document.getElementById('theFrag'));
theFrag.render(<TheFrag />);