export interface Post{
    content: string;
    date: string;
    _id: string;
}


export interface PostForHomePage {
    _id: string;
content: any;
date: any;
    username: string;
    posts: Post[];
}
