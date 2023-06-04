import React from 'react';
import ReactDOM from 'react-dom/client';

function App(props) {
    return (
        <>
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
