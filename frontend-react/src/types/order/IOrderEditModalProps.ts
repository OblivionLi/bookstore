import IOrdersData from "./IOrdersData";

export default interface IOrderEditModalProps {
    open: boolean;
    onClose: () => void;
    rowData: IOrdersData | null;
}