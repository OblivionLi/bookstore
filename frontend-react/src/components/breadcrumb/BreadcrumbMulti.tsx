import React from 'react';
import IBreadcrumbProps from "../../types/IBreadcrumbProps";
import {Link} from "react-router-dom";
import {Breadcrumbs, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";

const BreadcrumbMulti: React.FC<IBreadcrumbProps> = ({items}) => {
    return (
        <>
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{mt: 3, ml: 25}}>
                <Link to="/" style={{textDecoration: "none"}}>
                    Home
                </Link>

                {items.map((item, index) => (
                    <div key={index} className={index === items.length - 1 ? 'active' : ''}>
                        {index === items.length - 1 ? (
                            <Typography color="text.primary">
                                {item}
                            </Typography>
                        ) : (
                            <Link color="inherit" to={`/${item.toLowerCase()}`}>
                                {item}
                            </Link>
                        )}
                    </div>
                ))}
            </Breadcrumbs>
        </>
    );
};

export default BreadcrumbMulti;