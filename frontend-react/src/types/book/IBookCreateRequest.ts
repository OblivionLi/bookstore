export default interface IBookCreateRequest {
    type: string;
    isbn: string;
    title: string;
    publisher: string;
    description: string;
    pages: number;
    publicationYear: number;
    discount?: number | null;
    price: number;
    authors: string[];
    genres: string[];
    releaseDate: string;
    fileSize?: number | null;
    downloadLink?: string | null;
    quantity?: number | null;
    coverImage?: string | null;
    audioFormat?: string | null;
    duration?: string | null;
    narrator?: string | null;
    fileFormat?: string | null;
}