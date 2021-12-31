import React, { useEffect, useState } from "react";
import axios from "axios";

import Posts from "./Posts";
import Pagination from "./Pagination";
export interface IPostsProp {
  id: string;
  title: string
}
const Table = () => {
  const [posts, setPosts] = useState<IPostsProp[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const paginate = (number: number) => {
    const lastpage =Math.ceil(posts.length / postsPerPage);
    if (number<=0) {
      setCurrentPage(1);
    }
    else  if (number>=lastpage) {
      setCurrentPage(lastpage);
    }
    else{
      setCurrentPage(number);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container mt-4">

      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Table;
