export default interface IBooksData {
    id: number;
    type: string;
    slug: string;
    isbn: string;
    title: string;
    authors: string[];
    genres: BookGenres[];
    pages: number;
    publicationYear: number;
    discount: number;
    price: number;
    releaseDate: number;
    description: string;
    publisher: string;
    ratings: RatingResponse[];
    averageBookRating: number;
    fileFormat: string;
    quantity: number;
    fileSize: string;
    downloadLink: string;
    duration: string;
    narrator: string;
    coverImage: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RatingResponse {
    id: number;
    userId: number;
    bookId: number;
    userName: string;
    rating: number;
    review: string;
}

type BookGenres =
    | "Mystery"
    | "Science Fiction"
    | "Fantasy"
    | "Romance"
    | "Thriller"
    | "Horror"
    | "Historical Fiction"
    | "Biography"
    | "Non-Fiction"
    | "Young Adult"
    | "Dystopian"
    | "Adventure"
    | "Science"
    | "Self-Help"
    | "Fantasy Romance"
    | "Historical Romance"
    | "Children's Fiction"
    | "Comedy"
    | "Erotica"
    | "Poetry"
    | "Classics"
    | "Contemporary"
    | "Crime"
    | "Espionage"
    | "Fairy Tales"
    | "Family"
    | "Graphic Novels"
    | "Health"
    | "Humor"
    | "Inspirational"
    | "Literary Fiction"
    | "Military"
    | "Paranormal"
    | "Philosophy"
    | "Psychology"
    | "Religion"
    | "Satire"
    | "Short Stories"
    | "Sports"
    | "Travel"
    | "True Crime"
    | "Urban Fiction"
    | "Western"
    | "Women's Fiction"
    | "Business"
    | "Cookbooks"
    | "Crafts"
    | "DIY"
    | "Fashion"
    | "Gardening";