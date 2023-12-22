export default interface IAddAddressModalProps {
    onSave: (isSuccessful: boolean) => void;
    onClose: () => void;
    openAdd: boolean;
}