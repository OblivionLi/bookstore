export default interface IReviews {
    id: number;
    bookId: number;
    bookTitle: string;
    userEmail: string;
    rating: number;
    review: string;
    createdAt: Date;
    updatedAt: Date;
}