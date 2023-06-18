"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type CustomSessionUser } from "../api/auth/[...nextauth]/route";
import Profile from "@/components/Profile";
// import { Post as PostProps } from "@/components/QuoteCard";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  const user: CustomSessionUser = session?.user as CustomSessionUser;

  interface PostProps {
    _id: string;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      // const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const response = await fetch(`/api/users/${user?.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    //   if (session?.user?.id) fetchPosts();
    // }, [session?.user?.id]);

    if (user?.id) fetchPosts();
  }, [user?.id]);

  const handleEdit = (post: PostProps) => {
    router.push(`/update-quote?id=${post._id}`);
  };

  const handleDelete = async (post: PostProps) => {
    const hasConfirmed = confirm("Are you sure you want to delete this quote?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/quote/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter(
          (item: { _id: string }) => item._id !== post._id
        );

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="This is your personalized profile page. Edit or delete your quotes as you wish"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
