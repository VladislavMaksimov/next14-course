"use client";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

import PromptCardList from "./PromptCardList";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Feed = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [searchText, setSearchText] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [posts, setPosts] = useState([]);

  const handleChangeText = useDebouncedCallback((value) => {
    setSearchTag("");
    setSearchText(value);
  }, 500);

  const handleProfileClick = (userId) => {
    if (session?.user.id === userId) {
      router.push("/profile");
      return;
    }
    router.push(`/users/${userId}`);
  };

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
          profileClick={(userId) => {
            handleProfileClick(userId);
          }}
          handleTagClick={(tag) => {
            setSearchTag(tag);
          }}
        />
      </form>
    </section>
  );
};

export default Feed;
