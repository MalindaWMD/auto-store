import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './common/header/Header';

function App(props) {
    return (
        <>
            <Header/>
            <h1>This is home</h1>
            {props.children}
        </>
    );
}

export default App;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
}
