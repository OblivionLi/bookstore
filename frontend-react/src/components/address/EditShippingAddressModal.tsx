import React, {ChangeEvent, useEffect, useState} from 'react';
import IUserAddresses from "../../types/IUserAddresses";
import 'bootstrap/dist/css/bootstrap.min.css';
import UsersService from "../../services/UsersService";
import {IUserShippingAddress} from "../../types/IUserShippingAddress";

const EditShippingAddressModal: React.FC<IUserAddresses> = ({
                                                                               address,
                                                                               onSave,
                                                                               onClose,}) => {

    const shippingAddress = address as IUserShippingAddress;

    const initialFormData = {
        id: 0,
        addressType: "shipping",
        street: '',
        city: '',
        state: '',
        country: '',
        phoneNumber: '',
        zipcode: '',
        recipientName: '',
        deliveryNotes: '',
        default: false
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (shippingAddress) {
            setFormData({
                ...initialFormData,
                ...shippingAddress,
                id: shippingAddress?.id
            })
        }
    }, [shippingAddress]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSave = () => {
        UsersService.updateAddress(formData)
            .then((response: any) => {
                onSave(true);
                onClose();
            })
            .catch((e: any) => {
                onClose();
                console.log(e);
            });
    }

    return (
        <div className="modal fade" id="editShippingAddressModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Shipping Address</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="street" className="form-label">Change Street</label>
                            <input
                                type="text"
                                className="form-control"
                                id="street"
                                placeholder="Enter your new street.."
                                required={true}
                                defaultValue={shippingAddress?.street || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">Change City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                placeholder="Enter your new city.."
                                required={true}
                                defaultValue={shippingAddress?.city || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Change Country</label>
                            <input
                                type="text"
                                className="form-control"
                                id="country"
                                placeholder="Enter your new country.."
                                required={true}
                                defaultValue={shippingAddress?.country || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="state" className="form-label">Change State</label>
                            <input
                                type="text"
                                className="form-control"
                                id="state"
                                placeholder="Enter your new state.."
                                required={true}
                                defaultValue={shippingAddress?.state || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Change Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phoneNumber"
                                placeholder="Enter your new phone number.."
                                required={true}
                                defaultValue={shippingAddress?.phoneNumber || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="zipCode" className="form-label">Change ZipCode</label>
                            <input
                                type="text"
                                className="form-control"
                                id="zipCode"
                                placeholder="Enter your new zip code.."
                                required={true}
                                defaultValue={shippingAddress?.zipcode || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="recipientName" className="form-label">Change Recipient Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="recipientName"
                                placeholder="Enter your new recipient name.."
                                required={true}
                                defaultValue={shippingAddress?.recipientName || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSave}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditShippingAddressModal;