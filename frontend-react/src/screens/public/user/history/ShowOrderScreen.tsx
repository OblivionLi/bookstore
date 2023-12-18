import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import IOrdersData from "../../../../types/order/IOrdersData";
import OrdersService from "../../../../services/OrdersService";

const ShowOrderScreen = () => {
    const {id} = useParams<{ id: string }>();
    const [order, setOrder] = useState<IOrdersData | undefined>();

    useEffect(() => {
        if (id) {
            fetchOrder();
        }
    }, [id]);

    const fetchOrder = () => {
        OrdersService.getOrder(parseInt(id!))
            .then((response: any) => {
                const orderData: IOrdersData = response?.data;
                console.log(orderData);
                setOrder(orderData);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    return (
        <>
            check order screen
        </>
    );
};

export default ShowOrderScreen;