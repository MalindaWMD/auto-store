import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './common/header/Header';
import Home from './pages/Home';

function App(props) {
    return (
        <>
            <Header/>

            {/* TEMP */}
            <Home/>
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
