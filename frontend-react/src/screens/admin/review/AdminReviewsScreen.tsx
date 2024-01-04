import React, {useEffect, useState} from 'react';
import BooksService from "../../../services/BooksService";
import IReviews from "../../../types/book/IReviews";
import DataTable, {TableColumn} from "react-data-table-component";
import {Button, Divider, Paper, Skeleton, Tooltip, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandedReviewDetails from "./ExpandedReviewDetails";
import UtilsService from "../../../services/UtilsService";
import IOrdersData from "../../../types/order/IOrdersData";
import EditReviewDialog from "./EditReviewDialog";
import {useNavigate} from "react-router-dom";
import LocalStorageService from "../../../services/LocalStorageService";

const AdminReviewsScreen = () => {
    const [reviews, setReviews] = useState<IReviews[]>([]);
    const [loading, setLoading] = useState(true);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<IReviews | null>(null);
    const navigate = useNavigate();
    const isUserAuthorized = LocalStorageService.isUserAuthorized();

    useEffect(() => {
        if (!isUserAuthorized) {
            navigate("/login");
            return;
        }

        fetchReviews();
    }, []);

    const fetchReviews = () => {
        BooksService.getAllReviews()
            .then((response: any) => {
                setReviews(response.data as IReviews[])
                setLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const DateCell = ({row, selector}: { row: IReviews; selector: (row: IReviews) => Date }) => {
        return (
            <Tooltip title={UtilsService.formatDate(selector(row))} arrow>
                <Typography variant="body2" noWrap>{UtilsService.formatDate(selector(row))}</Typography>
            </Tooltip>
        );
    };

    const createTooltipColumn = (
        name: string,
        selector: (row: IReviews) => string
    ): TableColumn<IReviews> => {
        return {
            name,
            cell: (row: IReviews) => (
                <Tooltip title={selector(row)} arrow>
                    <Typography variant="body2" noWrap>
                        {selector(row)}
                    </Typography>
                </Tooltip>
            ),
            sortable: true,
        };
    };

    const columns: TableColumn<IReviews>[] = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Book ID',
            selector: row => row.bookId,
            sortable: true,
        },
        createTooltipColumn("Book Title", (row) => row.bookTitle),
        createTooltipColumn("User Email", (row) => row.userEmail),
        {
            name: 'Rating',
            selector: row => row.rating,
            sortable: true,
        },
        {
            name: 'Created At',
            cell: (row: IReviews) => <DateCell row={row} selector={(row) => new Date(row.createdAt)}/>,
            sortable: true,
        }, {
            name: 'Updated At',
            cell: (row: IReviews) => <DateCell row={row} selector={(row) => new Date(row.updatedAt)}/>,
            sortable: true,
        },
        {
            name: 'Options',
            cell: (row: IReviews) => (
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

    const handleEdit = (row: IReviews) => {
        setEditDialogOpen(true);
        setSelectedReview(row);
    }

    const handleDelete = (row: IReviews) => {
        BooksService.deleteReview(row.id)
            .then((response: any) => {
                fetchReviews()
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
        setSelectedReview(null);
        fetchReviews();
    }

    return (
        <>
            <Typography variant={"h4"} gutterBottom>
                Reviews
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
                            key={reviews.length}
                            columns={columns}
                            data={reviews}
                            pagination
                            expandableRows
                            expandableRowsComponent={ExpandedReviewDetails}
                        />
                    </Paper>
                )}

            <EditReviewDialog
                open={editDialogOpen}
                onClose={handleEditDialogClose}
                rowData={selectedReview}
            />
        </>
    );
};

export default AdminReviewsScreen;