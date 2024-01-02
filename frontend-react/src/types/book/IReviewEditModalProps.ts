import IReviews from "./IReviews";

export default interface IReviewEditModalProps {
    open: boolean;
    onClose: () => void;
    rowData: IReviews | null;
}