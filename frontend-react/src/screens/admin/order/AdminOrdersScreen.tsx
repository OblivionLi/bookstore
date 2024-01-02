import React, {useEffect, useState} from 'react';
import OrdersService from "../../../services/OrdersService";
import IOrdersData from "../../../types/order/IOrdersData";
import {Button, Chip, Divider, Paper, Skeleton, Tooltip, Typography} from "@mui/material";
import DataTable, {TableColumn} from "react-data-table-component";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandedOrderDetails from "../../../components/order/ExpandedOrderDetails";
import IUserResponse from "../../../types/user/IUserResponse";
import EditOrderDialog from "./EditOrderDialog";
import UtilsService from "../../../services/UtilsService";

const AdminOrdersScreen = () => {
    const [orders, setOrders] = useState<IOrdersData[]>([]);
    const [loading, setLoading] = useState(true);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<IOrdersData | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        OrdersService.getAllOrders()
            .then((response: any) => {
                setOrders(response.data as IOrdersData[])
                setLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const DateCell = ({row, selector}: { row: IOrdersData; selector: (row: IOrdersData) => Date }) => {
        return (
            <Tooltip title={UtilsService.formatDate(selector(row))} arrow>
                <Typography variant="body2" noWrap>{UtilsService.formatDate(selector(row))}</Typography>
            </Tooltip>
        );
    };

    const columns: TableColumn<IOrdersData>[] = [
        {
            name: 'Order ID',
            selector: row => row.orderId ?? "not provided",
            sortable: true,
        },
        {
            name: 'Order Status',
            cell: (row: IOrdersData) => (
                <Chip
                    label={row?.orderStatus}
                    style={{
                        backgroundColor: row?.orderStatus === 'Completed' ? 'green' : 'default',
                        color: row?.orderStatus === 'Completed' ? 'white' : 'black'
                    }}
                />
            ),
            sortable: true,
        },
        {
            name: 'Payment Status',
            cell: (row: IOrdersData) => (
                <Chip
                    label={row?.paymentStatus}
                    style={{
                        backgroundColor: row?.paymentStatus === 'Payed' ? 'green' : 'default',
                        color: row?.paymentStatus === 'Payed' ? 'white' : 'black'
                    }}
                />
            ),
            sortable: true,
        },
        {
            name: 'Shipping cost (euro)',
            selector: row => row.shippingCost,
            sortable: true,
        },
        {
            name: 'Tax Amount (euro)',
            selector: row => row.taxAmount,
            sortable: true,
        },
        {
            name: 'Subtotal (euro)',
            selector: row => row.subtotal,
            sortable: true,
        },
        {
            name: 'Total (euro)',
            selector: row => row.totalPrice.toFixed(2),
            sortable: true,
        },
        {
            name: 'Created At',
            cell: (row: IOrdersData) => <DateCell row={row} selector={(row) => new Date(row.createdAt)}/>,
            sortable: true,
        }, {
            name: 'Updated At',
            cell: (row: IOrdersData) => <DateCell row={row} selector={(row) => new Date(row.updatedAt)}/>,
            sortable: true,
        },
        {
            name: 'Options',
            cell: (row: IOrdersData) => (
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
        }
    ];

    const handleDelete = (row: IOrdersData) => {
        OrdersService.deleteOrder(row.id)
            .then((response: any) => {
                fetchOrders()
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    const handleEdit = (row: IOrdersData) => {
        setEditDialogOpen(true);
        setSelectedOrder(row);
    }

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
        setSelectedOrder(null);
        fetchOrders();
    }

    return (
        <>
            <Typography variant={"h4"} gutterBottom>
                Orders
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
                            key={orders.length}
                            columns={columns}
                            data={orders}
                            pagination
                            expandableRows
                            expandableRowsComponent={ExpandedOrderDetails}
                        />
                    </Paper>
                )}

            <EditOrderDialog
                open={editDialogOpen}
                onClose={handleEditDialogClose}
                rowData={selectedOrder}
            />
        </>
    );
};

export default AdminOrdersScreen;