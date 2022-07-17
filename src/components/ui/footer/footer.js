import React from 'react';

const footer = () => (

    <div className="container">
        <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Company details</a></li>
                <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Contact us</a></li>
                <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Privacy policy</a></li>
                <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">About us</a></li>
            </ul>
            <p className="text-center text-muted">&copy; 2021 Company, Inc</p>
        </footer>
    </div>
)

export default footer;