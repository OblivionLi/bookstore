import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import IReviewEditModalProps from "../../../types/book/IReviewEditModalProps";
import IReviewEditRequest from "../../../types/book/IReviewEditRequest";
import BooksService from "../../../services/BooksService";
import {Button, Dialog, DialogContent, DialogTitle, Divider, Paper, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import LocalStorageService from "../../../services/LocalStorageService";

const EditReviewDialog:React.FC<IReviewEditModalProps> = ({ open, onClose, rowData }) => {
    const [review, setReview] = useState<string>(rowData?.review || '');
    const navigate = useNavigate();
    const isUserAuthorized = LocalStorageService.isUserAuthorized();

    useEffect(() => {
        if (!isUserAuthorized) {
            navigate("/login");
            return;
        }
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const reviewEditData: IReviewEditRequest = {
            id: rowData?.id,
            review: review
        }

        editReview(reviewEditData);
        onClose();
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setReview(e.target.value);
    };

    const editReview = (reviewEditData: IReviewEditRequest) => {
        BooksService.editReview(reviewEditData)
            .catch((e: any) => {
                console.error(e);
            });
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth={"md"} fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <Paper elevation={3}
                       sx={{padding: 3, marginTop: 3, width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="review"
                            label="Review"
                            defaultValue={rowData?.review || ''}
                            onChange={handleChange}
                        />
                        <Divider/>
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: '1rem'}}>
                            Edit Review
                        </Button>
                    </form>
                </Paper>
            </DialogContent>
        </Dialog>
    );
};

export default EditReviewDialog;