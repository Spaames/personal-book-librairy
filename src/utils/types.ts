export interface BookSearch {
    title: string;
    author: string;
    book_url: string;
    img: string;
}

export interface User {
    username: string;
}

export interface Book {
    ean: number;
    title: string;
    author: string;
    resume: string;
    img: string;
    pages: number;
    status: number;
}