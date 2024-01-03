import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, Grid, SelectChangeEvent} from '@mui/material';

interface BookFiltersProps {
    selectedFilter: string;
    setSelectedFilter: React.Dispatch<React.SetStateAction<string>> | ((newFilter: string) => void);
}

const BookFilters: React.FC<BookFiltersProps> = ({
                                                     selectedFilter,
                                                     setSelectedFilter,
                                                 }) => {

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setSelectedFilter(event.target.value as string);
    };

    return (
        <FormControl fullWidth sx={{ minWidth: 120 }}>
            <InputLabel id="filter-select-label">Filter By</InputLabel>
            <Select
                value={selectedFilter}
                onChange={handleFilterChange}
                labelId="filter-select-label"
                id="filter-select"
                label="Filter By"
            >
                <MenuItem value="">Empty Filter</MenuItem>
                <MenuItem value="publicationYear:asc">Publication Year (ASC)</MenuItem>
                <MenuItem value="publicationYear:desc">Publication Year (DESC)</MenuItem>
                <MenuItem value="releaseDate:asc">Release Date (ASC)</MenuItem>
                <MenuItem value="releaseDate:desc">Release Date (DESC)</MenuItem>
                <MenuItem value="price:asc">Price (ASC)</MenuItem>
                <MenuItem value="price:desc">Price (DESC)</MenuItem>
                <MenuItem value="ratings:asc">Rating (ASC)</MenuItem>
                <MenuItem value="ratings:desc">Rating (DESC)</MenuItem>
            </Select>
        </FormControl>
    );
};

export default BookFilters;
