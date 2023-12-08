export default interface IUserDtoResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    userGroupCodes: string[]
}