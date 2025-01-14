export interface Post{
    content: string;
    date: string;
    _id: string;
}


export interface PostForHomePage {
    username: string;
    posts: Post[];
}

// export interface PostsFromBackend {
//     data: PostForHomePage[];
// }