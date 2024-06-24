"use client";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [posts, setPosts] = useState([]);

  const handleChangeText = useDebouncedCallback((value) => {
    setSearchTag("");
    setSearchText(value);
  }, 500);

  useEffect(() => {
    const fetchPosts = async () => {
      const searchParams = new URLSearchParams(
        searchTag
          ? {
              tag: searchTag,
              mode: "exact",
            }
          : {
              prompt: searchText,
              tag: searchText,
              creator: searchText,
              filterMode: "contains",
            }
      );

      const response = await fetch("/api/prompt?" + searchParams);
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, [searchTag, searchText]);

  return (
    <section className="feed">
      <form
        action=""
        className="relative w-full flex-col flex-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            handleChangeText(e.target.value);
          }}
          className="search_input peer"
        />

        <PromptCardList
          posts={posts}
          handleTagClick={(tag) => {
            setSearchTag(tag);
          }}
        />
      </form>
    </section>
  );
};

export default Feed;
