export interface Post{
    content: string;
    date: string;
    _id: string;
}


export interface UserPost {
    _id: string;
    content: any;
    date: any;
    username: string;
    posts: Post[];
}
