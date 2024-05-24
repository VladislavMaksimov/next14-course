"use client";
import { useState, useEffect } from "react";

import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {};

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-col flex-center">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />

        <PromptCardList posts={posts} handleTagClick={() => {}} />
      </form>
    </section>
  );
};

export default Feed;
