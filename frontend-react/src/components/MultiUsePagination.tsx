import React from 'react';
import IPaginationProps from "../types/IPaginationProps";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Pagination, PaginationItem, Stack} from "@mui/material";

const MultiUsePagination: React.FC<IPaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    const handleClick = (event: React.ChangeEvent<unknown>, page: number) => {
        event.preventDefault();
        onPageChange(page);
    };

    return (
        <Stack spacing={2} alignItems="center" justifyContent="center" mt={2}>
            <Pagination
                count={totalPages}
                defaultPage={1}
                onChange={(event, page) => handleClick(event as React.ChangeEvent<unknown>, page - 1)}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                    />
                )}
            />
        </Stack>
    );
};

export default MultiUsePagination;