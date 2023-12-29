import React, {useEffect, useState} from 'react';
import {Button, Chip, Divider, Paper, Skeleton, Typography} from "@mui/material";
import DataTable, {TableColumn} from "react-data-table-component";
import ExpandedOrderDetails from "../../../components/order/ExpandedOrderDetails";
import OrdersService from "../../../services/OrdersService";
import UsersService from "../../../services/UsersService";
import DataRow from "../../../types/order/IDataRow";
import Box from "@mui/material/Box";
import PaymentIcon from "@mui/icons-material/Payment";
import InfoIcon from "@mui/icons-material/Info";
import IOrdersData from "../../../types/order/IOrdersData";
import IUserResponse from "../../../types/user/IUserResponse";

const AdminUsersScreen = () => {
    const [users, setUsers] = useState<IUserResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        UsersService.getAllUsers()
            .then((response: any) => {
                setUsers(response.data as IUserResponse[])
                setLoading(false);
                console.log(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const columns: TableColumn<IUserResponse>[] = [
        {
            name: 'UserId',
            selector: row => row.id,
            sortable: true,
        },
        // {
        //     name: 'Placed At',
        //     selector: row => row.orderDate,
        //     sortable: true,
        // },
        // {
        //     name: 'Order Status',
        //     cell: (row: DataRow) => (
        //         <Chip
        //             label={row?.orderStatus}
        //             style={{
        //                 backgroundColor: row?.orderStatus === 'Completed' ? 'green' : 'default',
        //                 color: row?.orderStatus === 'Completed' ? 'white' : 'black'
        //             }}
        //         />
        //     ),
        //     sortable: true,
        // },
        // {
        //     name: 'Payment Status',
        //     cell: (row: DataRow) => (
        //         <Chip
        //             label={row?.paymentStatus}
        //             style={{
        //                 backgroundColor: row?.paymentStatus === 'Payed' ? 'green' : 'default',
        //                 color: row?.paymentStatus === 'Payed' ? 'white' : 'black'
        //             }}
        //         />
        //     ),
        //     sortable: true,
        // },
        // {
        //     name: 'Tax (euro)',
        //     selector: row => row.taxAmount,
        //     sortable: true,
        // },
        // {
        //     name: 'Shipping Cost (euro)',
        //     selector: row => row.shippingCost,
        //     sortable: true,
        // },
        // {
        //     name: 'Total Price (euro)',
        //     selector: row => row.totalPrice,
        //     sortable: true,
        // },
        // {
        //     name: 'Options',
        //     cell: (row: DataRow) => (
        //         <Box sx={{ mt: 1, mb: 1, display: 'flex', flexDirection: 'column', gap: '8px'}}>
        //             <Button
        //                 variant="contained"
        //                 color="primary"
        //                 onClick={() => handleEdit(row)}
        //                 size="small"
        //                 startIcon={<PaymentIcon />}
        //             >
        //                 Edit
        //             </Button>
        //             <Button
        //                 variant="contained"
        //                 color="primary"
        //                 onClick={() => handleDelete(row)}
        //                 size="small"
        //                 startIcon={<InfoIcon />}
        //             >
        //                 Delete
        //             </Button>
        //         </Box>
        //     ),
        // }
    ];

    const handleEdit = (row: DataRow) => {

    }

    const handleDelete = (row: DataRow) => {

    }

    return (
        <>
            <Typography variant={"h4"} gutterBottom>
                Users
            </Typography>
            <Divider />


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
                   sx={{padding: 3, marginTop: 3, width: '85%', marginLeft: 'auto', marginRight: 'auto'}}>

                <DataTable
                    columns={columns}
                    data={users}
                    pagination
                    expandableRows
                    // expandableRowsComponent={ExpandedOrderDetails}
                />
            </Paper>
            )}
        </>
    );
};

export default AdminUsersScreen;