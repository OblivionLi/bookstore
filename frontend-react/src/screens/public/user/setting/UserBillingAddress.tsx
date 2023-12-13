import React, {useEffect, useState} from 'react';
import {IUserBillingAddress} from "../../../../types/user/IUserBillingAddress";
import UsersService from "../../../../services/UsersService";
import AddBillingAddressModal from "../../../../components/address/AddBillingAddressModal";
import EditBillingAddressModal from "../../../../components/address/EditBillingAddressModal";

const UserBillingAddress = () => {
    const [billingAddresses, setBillingAddresses] = useState<Array<IUserBillingAddress>>([]);
    const [editedAddress, setEditedAddress] = useState<IUserBillingAddress | null>(null);

    useEffect(() => {
        fetchBillingAddresses();
    }, []);

    const fetchBillingAddresses = () => {
        UsersService.getAllBillingAddresses()
            .then((response: any) => {
                setBillingAddresses(response.data || []);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const handleSave = () => {
        console.log("Billing address added with success.")
    }

    const handleSavedAddress = (isAddressSaved: boolean) => {
        if (isAddressSaved) {
            fetchBillingAddresses();
        }
    }

    const handleEdit = (index: number) => {
        const selectedAddress = billingAddresses[index];
        setEditedAddress(selectedAddress);
    }

    const handleUpdatedAddress = (isAddressUpdated: boolean) => {
        if (isAddressUpdated) {
            fetchBillingAddresses();
        }
    }

    const handleDelete = (addressId: number) => {
        UsersService.deleteAddress(addressId, "billing")
            .then((response: any) => {
                fetchBillingAddresses();
                console.log(response?.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const handleMarkAsDefault = (addressId: number) => {
        UsersService.markAddressAsDefault(addressId, "billing")
            .then((response: any) => {
                fetchBillingAddresses();
                console.log(response?.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const handleCloseModal = () => {
        setEditedAddress(null);
    };

    return (
        <div className="user-settings-forms">
            <div className="user-settings-address-header">
                <h2>Billing Address</h2>
                {billingAddresses.length < 3 && (
                    <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => handleSave()}
                        data-bs-toggle="modal"
                        data-bs-target="#addBillingAddressModal"
                    >
                        Add Address
                    </button>
                )}
            </div>
            <hr/>

            <p className="lead">
                <i>You can only have 3 billing addresses.</i> <br/>
                <i>The billing address with a grey background it's your default billing address.</i>
            </p>

            <hr/>

            {billingAddresses.length === 0 ? (<p>You don't have any billing address set.</p>) : (
                <table className="table table-sm table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Country</th>
                        <th scope="col">City</th>
                        <th scope="col">Street</th>
                        <th scope="col">Zipcode</th>
                        <th scope="col">Billing name</th>
                        <th scope="col">Is default?</th>
                        <th scope="col">Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    {billingAddresses && billingAddresses.map((billingAddress, index) => (
                        <tr key={index} className={billingAddress?.default ? 'table-active' : ''}>
                            <td>{billingAddress?.country || 'Not provided'}</td>
                            <td>{billingAddress?.city || 'Not provided'} </td>
                            <td>{billingAddress?.street || 'Not provided'}</td>
                            <td>{billingAddress?.zipcode || 'Not provided'}</td>
                            <td>{billingAddress?.billingName || 'Not provided'}</td>
                            <th scope="row">{billingAddress.default ? "Yes" : "No"}</th>
                            <td>
                                <div>
                                    {!billingAddress?.default && (
                                        <button type="button" className="btn btn-outline-primary"
                                                onClick={() => handleMarkAsDefault(billingAddress?.id)}>Mark
                                            Default</button>)}
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => handleEdit(index)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#editBillingAddressModal"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(billingAddress?.id)}
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

            <EditBillingAddressModal
                address={editedAddress}
                onSave={handleUpdatedAddress}
                onClose={handleCloseModal}
            />

            <AddBillingAddressModal
                onSave={handleSavedAddress}
            />
        </div>
    );
};

export default UserBillingAddress;