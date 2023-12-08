import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import IUserTokenDecodedData from "../../../../types/IUserTokenDecodedData";
import {useNavigate} from "react-router-dom";
import LocalStorageService from "../../../../services/LocalStorageService";
import {IUserShippingAddress} from "../../../../types/IUserShippingAddress";
import BooksService from "../../../../services/BooksService";
import UsersService from "../../../../services/UsersService";
import EditShippingAddressModal from "../../../../components/address/EditShippingAddressModal";
import AddShippingAddressModal from "../../../../components/address/AddShippingAddressModal";

const UserShippingAddress = () => {
    const [shippingAddresses, setShippingAddresses] = useState<Array<IUserShippingAddress>>([]);
    const [editedAddress, setEditedAddress] = useState<IUserShippingAddress | null>(null);

    useEffect(() => {
        fetchShippingAddresses();
    }, []);

    const fetchShippingAddresses = () => {
        UsersService.getAllShippingAddresses()
            .then((response: any) => {
                setShippingAddresses(response.data || []);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const handleEdit = (index: number) => {
        const selectedAddress = shippingAddresses[index];
        setEditedAddress(selectedAddress);
    };

    const handleUpdatedAddress = (isAddressUpdated: boolean) => {
        if (isAddressUpdated) {
            fetchShippingAddresses();
        }
    };

    const handleSavedAddress = (isAddressSaved: boolean) => {
        if (isAddressSaved) {
            fetchShippingAddresses();
        }
    }

    const handleCloseModal = () => {
        setEditedAddress(null);
    };

    const handleDelete = (addressId: number) => {
        UsersService.deleteAddress(addressId, "shipping")
            .then((response: any) => {
                fetchShippingAddresses();
                console.log(response?.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const handleMarkAsDefault = (addressId: number) => {
        UsersService.markAddressAsDefault(addressId, "shipping")
            .then((response: any) => {
                fetchShippingAddresses();
                console.log(response?.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const handleSave = () => {
        console.log("Shipping address added with success.")
    }

    return (
        <div className="user-settings-forms">
            <div className="user-settings-address-header">
                <h2>Shipping Address</h2>
                {shippingAddresses.length < 3 && (
                    <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => handleSave()}
                        data-bs-toggle="modal"
                        data-bs-target="#addShippingAddressModal"
                    >
                        Add Address
                    </button>
                )}
            </div>
            <hr/>

            <p className="lead">
                <i>You can only have 3 shipping addresses.</i> <br/>
                <i>The shipping address with a grey background it's your default shipping address.</i>
            </p>

            <hr/>

            {shippingAddresses.length === 0 ? (<p>You don't have any shipping address set.</p>) : (
                <table className="table table-sm table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Country</th>
                        <th scope="col">City</th>
                        <th scope="col">Street</th>
                        <th scope="col">Zipcode</th>
                        <th scope="col">Recipient name</th>
                        <th scope="col">Is default?</th>
                        <th scope="col">Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {shippingAddresses && shippingAddresses.map((shippingAddress, index) => (
                        <tr key={index} className={shippingAddress?.default ? 'table-active' : ''}>
                            <td>{shippingAddress?.country || 'Not provided'}</td>
                            <td>{shippingAddress?.city || 'Not provided'} </td>
                            <td>{shippingAddress?.street || 'Not provided'}</td>
                            <td>{shippingAddress?.zipcode || 'Not provided'}</td>
                            <td>{shippingAddress?.recipientName || 'Not provided'}</td>
                            <th scope="row">{shippingAddress.default ? "Yes" : "No"}</th>
                            <td>
                                <div>
                                    {!shippingAddress?.default && (
                                        <button type="button" className="btn btn-outline-primary"
                                                onClick={() => handleMarkAsDefault(shippingAddress?.id)}>Mark
                                            Default</button>)}
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => handleEdit(index)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#editShippingAddressModal"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(shippingAddress?.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <EditShippingAddressModal
                address={editedAddress}
                onSave={handleUpdatedAddress}
                onClose={handleCloseModal}
            />

            <AddShippingAddressModal
                onSave={handleSavedAddress}
            />
        </div>
    );
};

export default UserShippingAddress;