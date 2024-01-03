import React, {useState} from 'react';
import {Button, Chip, Dialog, DialogContent, DialogTitle, Divider, InputLabel, Paper, TextField} from "@mui/material";
import IBookCreateRequest from "../../../types/book/IBookCreateRequest";
import BooksService from "../../../services/BooksService";
import IBookAddModalProps from "../../../types/book/IBookAddModalProps";
import UtilsService from "../../../services/UtilsService";


const AddBookDialog:React.FC<IBookAddModalProps> = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        type: '',
        isbn: '',
        title: '',
        publisher: '',
        description: '',
        pages: '',
        publicationYear: '',
        discount: '',
        price: '',
        authors: [] as string[],
        genres: [] as string[],
        releaseDate: '',
        fileSize: '',
        downloadLink: '',
        quantity: '',
        coverImage: '',
        audioFormat: '',
        duration: '',
        narrator: '',
        fileFormat: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;

        if (id === 'authors') {
            // Convert comma-separated string to an array
            const authorsArray = value.split(',').map((author) => author.trim());
            setFormData((prevData) => ({ ...prevData, [id]: authorsArray }));
        } else {
            setFormData((prevData) => ({ ...prevData, [id]: value }));
        }
    };

    const handleChipClick = (genre: string) => {
        setFormData((prevData) => {
            const updatedGenres = prevData.genres.includes(genre)
                ? prevData.genres.filter((g) => g !== genre)
                : [...prevData.genres, genre];

            return { ...prevData, genres: updatedGenres };
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const bookData: IBookCreateRequest = {
            type: formData.type,
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
            quantity: formData.quantity ? parseInt(formData.quantity, 10) : null,
            coverImage: formData.coverImage || null,
            audioFormat: formData.audioFormat || null,
            duration: formData.duration || null,
            narrator: formData.narrator || null,
            fileFormat: formData.fileFormat || null,
        };

        addBook(bookData);
        onClose();
    };

    const addBook = (data: IBookCreateRequest) => {
        BooksService.addBook(data)
            .catch((e: any) => {
                console.error(e);
            });
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth={"md"} fullWidth>
            <DialogTitle>Add Book</DialogTitle>
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
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="isbn"
                            label="ISBN"
                            value={formData.isbn}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="type"
                            label="Type"
                            value={formData.type}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="publisher"
                            label="Publisher"
                            value={formData.publisher}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="pages"
                            label="Pages"
                            value={formData.pages}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="publicationYear"
                            label="Publication Year"
                            value={formData.publicationYear}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="discount"
                            label="Discount"
                            value={formData.discount}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="authors"
                            label="Authors"
                            value={formData.authors}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="releaseDate"
                            label="Release Date"
                            value={formData.releaseDate}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fileSize"
                            label="File Size"
                            value={formData.fileSize}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="downloadLink"
                            label="Download Link"
                            value={formData.downloadLink}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="quantity"
                            label="Quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="coverImage"
                            label="Cover Image"
                            value={formData.coverImage}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="audioFormat"
                            label="Audio Format"
                            value={formData.audioFormat}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="duration"
                            label="Duration"
                            value={formData.duration}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="narrator"
                            label="Narrator"
                            value={formData.narrator}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fileFormat"
                            label="File Format"
                            value={formData.fileFormat}
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
                        <InputLabel style={{marginTop: '1rem', marginBottom: '0.5rem'}}>Genres</InputLabel>
                        <Divider style={{margin: '1rem 0'}}/>
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {UtilsService.genres.map((genre) => (
                                <Chip
                                    key={genre}
                                    label={genre}
                                    onClick={() => handleChipClick(genre)}
                                    style={{
                                        marginRight: 8,
                                        marginBottom: 8,
                                        backgroundColor: formData.genres.includes(genre) ? '#4caf50' : '#bdbdbd',
                                        color: '#fff',
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </div>
                        <Divider/>
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: '1rem'}}>
                            Add Book
                        </Button>
                    </form>
                </Paper>
            </DialogContent>
        </Dialog>
    );
};

export default AddBookDialog;