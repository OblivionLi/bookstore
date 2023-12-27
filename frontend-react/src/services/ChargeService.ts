import IChargeData from "../types/payment/IChargeData";
import axios from "axios";
import LocalStorageService from "./LocalStorageService";

const pay = (chargeData: IChargeData) => {
    console.log(chargeData);
    return axios.post(`/api/payment/charge`, chargeData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LocalStorageService.getUserToken()}`
        },
    });
}

const ChargeService = {
    pay,
};

export default ChargeService;