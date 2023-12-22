import React, {useEffect, useState} from 'react';
import MainNavbar from "../../../../components/MainNavbar";
import DataTable, {TableColumn} from 'react-data-table-component';
import IOrdersData from "../../../../types/order/IOrdersData";
import OrdersService from "../../../../services/OrdersService";
import ExpandedOrderDetails from "../../../../components/order/ExpandedOrderDetails";
import DataRow from "../../../../types/order/IDataRow";
import BreadcrumbMulti from "../../../../components/breadcrumb/BreadcrumbMulti";
import {Button, Grid, Paper, Skeleton} from "@mui/material";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import PaymentIcon from '@mui/icons-material/Payment';

const OrderHistoryScreen = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<IOrdersData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const columns: TableColumn<DataRow>[] = [
        {
            name: 'OrderId',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Placed At',
            selector: row => row.orderDate,
            sortable: true,
        },
        {
            name: 'Order Status',
            selector: row => row.orderStatus,
            sortable: true,
        },
        {
            name: 'Payment Status',
            selector: row => row.paymentStatus,
            sortable: true,
        },
        {
            name: 'Tax (euro)',
            selector: row => row.taxAmount,
            sortable: true,
        },
        {
            name: 'Shipping Cost (euro)',
            selector: row => row.shippingCost,
            sortable: true,
        },
        {
            name: 'Total Price (euro)',
            selector: row => row.totalPrice,
            sortable: true,
        },
        {
            name: 'Options',
            cell: (row: DataRow) => (
                <Box sx={{ mt: 1, mb: 1, display: 'flex', flexDirection: 'column', gap: '8px'}}>
                    <Button
                        variant="contained"
                        color={row.paymentStatus === 'Successful' || row.paymentStatus === 'Refunded' || row.paymentStatus === 'Canceled' ? 'secondary' : 'success'}
                        onClick={() => handleOptionsClick(row)}
                        disabled={row.paymentStatus === 'Successful' || row.paymentStatus === 'Refunded' || row.paymentStatus === 'Canceled'}
                        size="small"
                        startIcon={<PaymentIcon />}
                    >
                        {row.paymentStatus === 'Successful' || row.paymentStatus === 'Refunded' || row.paymentStatus === 'Canceled' ? 'Paid' : 'Pay'}
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleShow(row)}
                        size="small"
                        startIcon={<InfoIcon />}
                    >
                        Show
                    </Button>
                </Box>
            ),
            button: true,
        }
    ];

    const handleOptionsClick = (row: DataRow) => {}
    const handleShow = (row: DataRow) => {
        navigate(`/order/${row.id}`);
    }

    const fetchOrders = () => {
        OrdersService.getOrders()
            .then((response: any) => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };



    const mapOrdersToDataRow = (orders: IOrdersData[]): DataRow[] => {
        return orders.map((order) => ({
            id: order.id,
            orderDate: order.orderDate,
            taxAmount: order.taxAmount,
            shippingCost: order.shippingCost,
            totalPrice: order.totalPrice.toFixed(2),
            orderStatus: order.orderStatus,
            notes: order.notes,
            orderShippingAddress: order.orderShippingAddress,
            orderBillingAddress: order.orderBillingAddress,
            orderLineItems: order.orderLineItems,
            paymentStatus: order.paymentStatus
        }));
    };

    const data: DataRow[] = mapOrdersToDataRow(orders);

    return (
        <>
            <MainNavbar/>
            <BreadcrumbMulti items={["Orders History"]}/>
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

                        {orders.length === 0 ? (<p>You have no orders placed.</p>) : (
                            <DataTable
                                title="Order History"
                                columns={columns}
                                data={data}
                                pagination
                                expandableRows
                                expandableRowsComponent={ExpandedOrderDetails}
                            />
                        )}
                    </Paper>
                )
            }
        </>
    );
};

export default OrderHistoryScreen;