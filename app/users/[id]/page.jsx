"use client";
import React, { useEffect, useState } from "react";

import Profile from "@components/Profile";
import { useParams } from "next/navigation";

const UserPage = () => {
  const params = useParams();

  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!params.id) return;

    const fetchUser = async () => {
      const response = await fetch(`/api/users/${params.id}`);
      const data = await response.json();
      setUser(data);
    };

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    fetchUser();
    fetchPosts();
  }, [params.id]);

  if (!user) return <></>;

  return (
    <Profile
      name={user.username}
      description={`Welcome to ${user.username} personalized profile page`}
      data={posts}
    />
  );
};

export default UserPage;
