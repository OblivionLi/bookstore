import React, {FormEvent, useState} from 'react';
import {Button, Chip, Dialog, DialogContent, DialogTitle, Divider, InputLabel, Paper} from "@mui/material";
import IOrderEditModalProps from "../../../types/order/IOrderEditModalProps";
import IOrderEditRequest from "../../../types/order/IOrderEditRequest";
import OrdersService from "../../../services/OrdersService";

const EditOrderDialog:React.FC<IOrderEditModalProps> = ({ open, onClose, rowData }) => {
    const orderStatuses = ["New", "Processing", "Shipped", "Delivered", "Refunded", "Canceled"];
    const paymentStatuses = ["Pending", "Successful", "Failed", "Refunded", "Canceled"];
    const [selectedOrderStatus, setSelectedOrderStatus] = useState<string | null>(rowData?.orderStatus || null);
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string | null>(rowData?.paymentStatus || null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const orderEditData: IOrderEditRequest = {
            id: rowData?.id,
            orderStatus: selectedOrderStatus,
            paymentStatus: selectedPaymentStatus
        }

        editOrder(orderEditData);
        onClose();
    }

    const editOrder = (orderEditData: IOrderEditRequest) => {
        OrdersService.editOrder(orderEditData)
            .catch((e: any) => {
                console.error(e);
            });
    }

    const handleChipClick = (status: string, isOrder: boolean) => {

        if (isOrder) {
            setSelectedOrderStatus((prevStatus) => {
                return prevStatus === status ? null : status;
            });
        } else {
            setSelectedPaymentStatus((prevStatus) => {
                return prevStatus === status ? null : status;
            });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth={"md"} fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <Paper elevation={3}
                       sx={{padding: 3, marginTop: 3, width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <form onSubmit={handleSubmit}>
                        <InputLabel style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Order Status</InputLabel>
                        <Divider style={{ margin: '1rem 0' }}/>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {orderStatuses.map((status) => (
                                <Chip
                                    key={status}
                                    label={status}
                                    onClick={() => handleChipClick(status, true)}
                                    style={{
                                        marginRight: 8,
                                        marginBottom: 8,
                                        backgroundColor: selectedOrderStatus === status ? '#4caf50' : '#bdbdbd',
                                        color: '#fff',
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </div>
                        <Divider/>

                        <InputLabel style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Payment Status</InputLabel>
                        <Divider style={{ margin: '1rem 0' }}/>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {paymentStatuses.map((status) => (
                                <Chip
                                    key={status}
                                    label={status}
                                    onClick={() => handleChipClick(status, false)}
                                    style={{
                                        marginRight: 8,
                                        marginBottom: 8,
                                        backgroundColor: selectedPaymentStatus === status ? '#4caf50' : '#bdbdbd',
                                        color: '#fff',
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </div>
                        <Divider/>
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: '1rem'}}>
                            Edit Order
                        </Button>
                    </form>
                </Paper>
            </DialogContent>
        </Dialog>
    );
};

export default EditOrderDialog;