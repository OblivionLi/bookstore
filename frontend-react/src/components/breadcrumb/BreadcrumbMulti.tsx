import React from 'react';
import IBreadcrumbProps from "../../types/IBreadcrumbProps";
import {Link} from "react-router-dom";



const BreadcrumbMulti: React.FC<IBreadcrumbProps> = ({ items }) => {
    if (items.length < 2) {
        console.error("Breadcrumb requires at least two items.");
        return null;
    }

    return (
        <nav className="breadcrumb-nav" aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                {items.map((item, index) => (
                    <li key={index} className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`} aria-current={index === items.length - 1 ? 'page' : undefined}>
                        {index === items.length - 1 ? (
                            <>{item}</>
                        ) : (
                            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default BreadcrumbMulti;