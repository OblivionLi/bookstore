import React from 'react';
import "../styles.css"

const Spinner = () => {
    return (
        <div className="d-flex align-items-center">
            <strong role="status">Loading...</strong>
        </div>
    );
};

export default Spinner;