import React from "react";
import { IPostsProp } from "./Table";

interface PostsProp {
    posts: IPostsProp[];
    loading: boolean;
}
const Posts = ({ posts, loading }: PostsProp) => {
    if (loading) {
        return <h2>loading...</h2>;
    }

    return (
        <ul className="list-group mb-4">
            {posts.map((post) => (
                <li key={post.id} className="list-group-item">
                    {post.title}
                </li>
            ))}
        </ul>
    );
};

export default Posts;
