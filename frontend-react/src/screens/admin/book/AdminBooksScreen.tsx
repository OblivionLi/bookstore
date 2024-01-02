import React, {useEffect, useState} from 'react';
import IBooksData from "../../../types/book/IBooksData";
import BooksService from "../../../services/BooksService";
import {Button, Chip, Divider, Paper, Skeleton, Tooltip, Typography} from "@mui/material";
import DataTable, {TableColumn} from "react-data-table-component";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandedBookDetails from "./ExpandedBookDetails";

const AdminBooksScreen = () => {
    const [books, setBooks] = useState<IBooksData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        BooksService.getAllBooksNoPagination()
            .then((response: any) => {
                setBooks(response.data as IBooksData[])
                setLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const createTooltipColumn = (
        name: string,
        selector: (row: IBooksData) => string
    ): TableColumn<IBooksData> => {
        return {
            name,
            cell: (row: IBooksData) => (
                <Tooltip title={selector(row)} arrow>
                    <Typography variant="body2" noWrap>
                        {selector(row)}
                    </Typography>
                </Tooltip>
            ),
            sortable: true,
        };
    };

    const columns: TableColumn<IBooksData>[] = [
        {
            name: 'Book ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'File Format',
            selector: row => row.fileFormat ?? "physical",
            sortable: true,
        },
        createTooltipColumn('ISBN', (row) => row.isbn),
        {
            name: 'Quantity',
            selector: row => row.type === "physical" ? row.quantity : "virtual",
            sortable: true,
        },
        createTooltipColumn('ISBN', (row) => row.publisher),
        {
            name: 'Publication Year',
            selector: row => row.publicationYear,
            sortable: true,
        },
        {
            name: 'Discount (%)',
            selector: row => row.discount,
            sortable: true,
        },
        {
            name: 'Price (euro)',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Release Date',
            selector: row => row.releaseDate,
            sortable: true,
        },
        {
            name: 'Ratings Count',
            selector: row => row.ratings.length,
            sortable: true,
        },
        {
            name: 'Rating Average',
            selector: row => row.averageBookRating,
            sortable: true,
        },
        {
            name: 'Options',
            cell: (row: IBooksData) => (
                <Box sx={{mt: 1, mb: 1, display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(row)}
                        size="small"
                        startIcon={<EditIcon/>}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDelete(row)}
                        size="small"
                        startIcon={<DeleteIcon/>}
                    >
                        Delete
                    </Button>
                </Box>
            ),
            style: {
                minWidth: '140px',
            },
        }
    ];

    const handleEdit = (row: IBooksData) => {

    }

    const handleDelete = (row: IBooksData) => {
        BooksService.deleteBook(row.id)
            .then((response: any) => {
                fetchBooks()
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    return (
        <>
            <Typography variant={"h4"} gutterBottom>
                Books
                <Typography variant="overline" display="block" gutterBottom>
                    For columns with cut value, hover over with your cursor to view the full value.
                </Typography>
            </Typography>
            <Divider/>

            {loading ?
                (
                    <Box sx={{width: '100%'}}>
                        {/* Skeleton for table header */}
                        <Box display="flex" alignItems="center" p={1}>
                            {Array.from({length: columns.length}).map((_, index) => (
                                <Box key={index} flex={1} pr={2}>
                                    <Skeleton variant="text"/>
                                </Box>
                            ))}
                        </Box>

                        {/* Skeleton for table rows */}
                        {Array.from({length: 2}).map((_, rowIndex) => (
                            <Box key={rowIndex} display="flex" alignItems="center" p={1}>
                                {Array.from({length: columns.length}).map((_, colIndex) => (
                                    <Box key={colIndex} flex={1} pr={2}>
                                        <Skeleton variant="text"/>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Paper elevation={3}
                           sx={{padding: 3, marginTop: 3, marginLeft: 'auto', marginRight: 'auto'}}>

                        <DataTable
                            key={books.length}
                            columns={columns}
                            data={books}
                            pagination
                            expandableRows
                            expandableRowsComponent={ExpandedBookDetails}
                        />
                    </Paper>
                )}

            {/*<EditOrderDialog*/}
            {/*    open={editDialogOpen}*/}
            {/*    onClose={handleEditDialogClose}*/}
            {/*    rowData={selectedOrder}*/}
            {/*/>*/}
        </>
    );
};

export default AdminBooksScreen;