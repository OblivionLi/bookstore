import React from 'react';
import {ExpanderComponentProps} from "react-data-table-component";
import DataRow from "../../types/order/IDataRow";
import OrderLineItem from "../../types/order/IOrderLineItem";

const ExpandedOrderDetails: React.FC<ExpanderComponentProps<DataRow>> = ({data}) => {
    return (
        <>
            <div className="container m-2">
                <h5>Notes:</h5> {data?.notes}
                <hr/>
                <h5>Shipping Address:</h5>
                <ul>
                    <li>Country: {data?.orderShippingAddress?.country || "Not provided"}</li>
                    <li>City: {data?.orderShippingAddress?.city || "Not provided"}</li>
                    <li>Street: {data?.orderShippingAddress?.street || "Not provided"}</li>
                    <li>ZipCode: {data?.orderShippingAddress?.zipcode || "Not provided"}</li>
                    <li>Recipient Name: {data?.orderShippingAddress?.recipientName || "Not provided"}</li>
                </ul>
                <hr/>
                <h5>Billing Address:</h5>
                <ul>
                    <li>Country: {data?.orderBillingAddress?.country || "Not provided"}</li>
                    <li>City: {data?.orderBillingAddress?.city || "Not provided"}</li>
                    <li>Street: {data?.orderBillingAddress?.street || "Not provided"}</li>
                    <li>ZipCode: {data?.orderBillingAddress?.zipcode || "Not provided"}</li>
                    <li>Recipient Name: {data?.orderBillingAddress?.billingName || "Not provided"}</li>
                </ul>
                <hr/>
                <h5>Order line items:</h5>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Type</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Price per Unit</th>
                        <th scope="col">Total Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.orderLineItems && data?.orderLineItems.map((orderLineItem: OrderLineItem, index: number) => (
                        <tr key={index}>
                            <td>{orderLineItem?.bookTitle}</td>
                            <td>Type: {orderLineItem?.bookType}</td>
                            <td>Quantity: {orderLineItem?.quantity}</td>
                            <td>Discount: {orderLineItem?.discount}</td>
                            <td>Price per Unit: {orderLineItem?.pricePerUnit}</td>
                            <td>Total Price: {orderLineItem?.totalPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ExpandedOrderDetails;