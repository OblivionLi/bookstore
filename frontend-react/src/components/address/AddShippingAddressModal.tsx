import React, {ChangeEvent, useState} from 'react';
import IAddAddressModalProps from "../../types/IAddAddressModalProps";
import 'bootstrap/dist/css/bootstrap.min.css';
import UsersService from "../../services/UsersService";

const AddShippingAddressModal: React.FC<IAddAddressModalProps> = ({onSave}) => {

    const [formData, setFormData] = useState({
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
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSave = () => {
        UsersService.saveAddress(formData)
            .then((response: any) => {
                onSave(true);
            })
            .catch((e: any) => {
                console.log(e);
            });
    }

    return (
        <div className="modal fade" id="addShippingAddressModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Shipping Address</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSave}>Save address</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddShippingAddressModal;