"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import Profile from "@/components/Profile";

const UserProfile = ({ params }: { params: Params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore and enjoy ${userName}'s exceptional quotes`}
      data={userPosts}
    />
  );
};

export default UserProfile;
