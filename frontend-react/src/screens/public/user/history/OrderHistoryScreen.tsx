import React, {useEffect, useState} from 'react';
import MainNavbar from "../../../../components/MainNavbar";
import Breadcrumb from "../../../../components/breadcrumb/Breadcrumb";
import DataTable, {TableColumn} from 'react-data-table-component';
import IOrdersData from "../../../../types/order/IOrdersData";
import OrdersService from "../../../../services/OrdersService";
import ExpandedOrderDetails from "../../../../components/order/ExpandedOrderDetails";
import DataRow from "../../../../types/order/IDataRow";

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
            <button
                type="button"
                className={`btn ${row.paymentStatus === 'Successful' || row.paymentStatus === 'Refunded' || row.paymentStatus === 'Canceled' ? 'btn-secondary' : 'btn-success'}`}
                onClick={() => handleOptionsClick(row)}
                disabled={row.paymentStatus === 'Successful' || row.paymentStatus === 'Refunded' || row.paymentStatus === 'Canceled'}
            >
                {row.paymentStatus === 'Successful' || row.paymentStatus === 'Refunded' || row.paymentStatus === 'Canceled' ? 'Paid' : 'Pay'}
            </button>
        ),
        button: true,
    }
];

const handleOptionsClick = (row: DataRow) => {

}

const OrderHistoryScreen = () => {
    const [orders, setOrders] = useState<IOrdersData[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        OrdersService.getOrders()
            .then((response: any) => {
                setOrders(response.data);
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
            <Breadcrumb page={"Orders History"}/>
            <hr/>

            <div className="container">
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
            </div>
        </>
    );
};

export default OrderHistoryScreen;