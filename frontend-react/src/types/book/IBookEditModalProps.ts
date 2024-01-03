import IBooksData from "./IBooksData";

export default interface IBookEditModalProps {
    open: boolean;
    onClose: () => void;
    rowData: IBooksData | null;
}