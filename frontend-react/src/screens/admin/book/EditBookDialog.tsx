import React, {useEffect, useState} from 'react';
import IBookEditModalProps from "../../../types/book/IBookEditModalProps";
import {Button, Chip, Dialog, DialogContent, DialogTitle, Divider, InputLabel, Paper, TextField} from "@mui/material";
import UtilsService from "../../../services/UtilsService";
import IBookEditRequest from "../../../types/book/IBookEditRequest";
import BooksService from "../../../services/BooksService";
import {useNavigate} from "react-router-dom";
import LocalStorageService from "../../../services/LocalStorageService";

const EditBookDialog: React.FC<IBookEditModalProps> = ({open, onClose, rowData}) => {
    const navigate = useNavigate();
    const isUserAuthorized = LocalStorageService.isUserAuthorized();

    useEffect(() => {
        if (!isUserAuthorized) {
            navigate("/login");
            return;
        }
    }, []);

    const [formData, setFormData] = useState({
        isbn: rowData?.isbn || '',
        title: rowData?.title || '',
        authors: rowData?.authors || [],
        genres: rowData?.genres || [] as string[],
        pages: rowData?.pages ? rowData.pages.toString() : '',
        publicationYear: rowData?.publicationYear ? rowData.publicationYear.toString() : '',
        discount: rowData?.discount ? rowData.discount.toString() : '',
        price: rowData?.price ? rowData.price.toString() : '',
        releaseDate: rowData?.releaseDate || '',
        description: rowData?.description || '',
        publisher: rowData?.publisher || '',
        fileFormat: rowData?.fileFormat || '',
        quantity: rowData?.quantity || 0,
        fileSize: rowData?.fileSize || '',
        downloadLink: rowData?.downloadLink || '',
        duration: rowData?.duration || '',
        narrator: rowData?.narrator || '',
        coverImage: rowData?.coverImage || ''
    });

    useEffect(() => {
        setFormData({
            isbn: rowData?.isbn || '',
            title: rowData?.title || '',
            authors: rowData?.authors || [],
            genres: rowData?.genres || [],
            pages: rowData?.pages ? rowData.pages.toString() : '',
            publicationYear: rowData?.publicationYear ? rowData.publicationYear.toString() : '',
            discount: rowData?.discount ? rowData.discount.toString() : '',
            price: rowData?.price ? rowData.price.toString() : '',
            releaseDate: rowData?.releaseDate || '',
            description: rowData?.description || '',
            publisher: rowData?.publisher || '',
            fileFormat: rowData?.fileFormat || '',
            quantity: rowData?.quantity || 0,
            fileSize: rowData?.fileSize || '',
            downloadLink: rowData?.downloadLink || '',
            duration: rowData?.duration || '',
            narrator: rowData?.narrator || '',
            coverImage: rowData?.coverImage || ''
        });
    }, [rowData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = event.target;

        if (id === 'authors') {
            const authorsArray = value.split(',').map((author) => author.trim());
            setFormData((prevData) => ({...prevData, [id]: authorsArray}));
        } else {
            setFormData((prevData) => ({...prevData, [id]: value}));
        }
    };

    const handleChipClick = (genre: string) => {
        setFormData((prevData) => {
            const updatedGenres = prevData.genres.includes(genre)
                ? prevData.genres.filter((g) => g !== genre)
                : [...prevData.genres, genre];

            return {...prevData, genres: updatedGenres};
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const bookType = rowData?.type.toLowerCase() === 'physical' ? 'BOOK' : rowData?.type.toLowerCase() === 'audio' ? 'AUDIOBOOK' : 'EBOOK';

        const bookData: IBookEditRequest = {
            id: rowData?.id,
            type: bookType,
            isbn: formData.isbn,
            title: formData.title,
            publisher: formData.publisher,
            description: formData.description,
            pages: parseInt(formData.pages, 10),
            publicationYear: parseInt(formData.publicationYear, 10),
            discount: formData.discount ? parseInt(formData.discount, 10) : null,
            price: parseFloat(formData.price),
            authors: formData.authors,
            genres: formData.genres.map((genre) => genre.toUpperCase()),
            releaseDate: formData.releaseDate,
            fileSize: formData.fileSize ? parseInt(formData.fileSize, 10) : null,
            downloadLink: formData.downloadLink || null,
            quantity: formData.quantity ? formData.quantity : null,
            coverImage: formData.coverImage || null,
            audioFormat: formData.fileFormat || null,
            duration: formData.duration || null,
            narrator: formData.narrator || null,
            fileFormat: formData.fileFormat || null,
        };

        updateBook(bookData);
        onClose();
    };

    const updateBook = (data: IBookEditRequest) => {
        BooksService.editBook(data)
            .catch((e: any) => {
                console.error(e);
            });
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth={"md"} fullWidth>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogContent>
                <Paper elevation={3}
                       sx={{padding: 3, marginTop: 3, width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            defaultValue={formData.title}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="isbn"
                            label="ISBN"
                            defaultValue={formData.isbn}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="publisher"
                            label="Publisher"
                            defaultValue={formData.publisher}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="pages"
                            label="Pages"
                            defaultValue={formData.pages}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="publicationYear"
                            label="Publication Year"
                            defaultValue={formData.publicationYear}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="discount"
                            label="Discount"
                            defaultValue={formData.discount}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Price"
                            defaultValue={formData.price}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="authors"
                            label="Authors"
                            defaultValue={formData.authors}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="releaseDate"
                            label="Release Date"
                            defaultValue={formData.releaseDate}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {rowData?.type === 'physical' && (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="coverImage"
                                    label="Cover Image"
                                    defaultValue={formData.coverImage}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="quantity"
                                    label="Quantity"
                                    defaultValue={formData.quantity}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        {rowData?.type === 'ebook' && (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fileSize"
                                    label="File Size"
                                    defaultValue={formData.fileSize}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fileFormat"
                                    label="File Format"
                                    defaultValue={formData.fileFormat}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="downloadLink"
                                    label="Download Link"
                                    defaultValue={formData.downloadLink}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        {rowData?.type === 'audio' && (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fileSize"
                                    label="File Size"
                                    defaultValue={formData.fileSize}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fileFormat"
                                    label="File Format"
                                    defaultValue={formData.fileFormat}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="duration"
                                    label="Duration"
                                    defaultValue={formData.duration}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="narrator"
                                    label="Narrator"
                                    defaultValue={formData.narrator}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="downloadLink"
                                    label="Download Link"
                                    defaultValue={formData.downloadLink}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        <InputLabel style={{marginTop: '1rem', marginBottom: '0.5rem'}}>Genres</InputLabel>
                        <Divider style={{margin: '1rem 0'}}/>
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {UtilsService.genres.map((genre) => (
                                <Chip
                                    key={genre}
                                    label={genre}
                                    onClick={() => handleChipClick(genre.toUpperCase())}
                                    style={{
                                        marginRight: 8,
                                        marginBottom: 8,
                                        backgroundColor: formData.genres.includes(genre.toUpperCase()) ? '#4caf50' : '#bdbdbd',
                                        color: '#fff',
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </div>
                        <Divider/>
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: '1rem'}}>
                            Edit Book
                        </Button>
                    </form>
                </Paper>
            </DialogContent>
        </Dialog>
    );
};

export default EditBookDialog;