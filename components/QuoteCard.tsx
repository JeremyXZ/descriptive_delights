"use client";
import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const QuoteCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <CardWrapper>
      <ProfileWrapper>
        <ClickWrapper onClick={handleProfileClick}>
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            style={{ borderRadius: "9999px", objectFit: "contain" }}
          />

          <FlexWrapper>
            <NameWrapper>{post.creator.username}</NameWrapper>
            <EmailWrapper>{post.creator.email}</EmailWrapper>
          </FlexWrapper>
        </ClickWrapper>
      </ProfileWrapper>

      <QuoteWrapper>{post.quote}</QuoteWrapper>
      <TagWrapper onClick={() => handleTagClick && handleTagClick(post.tag)}>
        #{post.tag}
      </TagWrapper>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <ChangeWrapper>
          <GreenGradient onClick={handleEdit}>Edit</GreenGradient>
          <GreenGradient onClick={handleDelete}>Delete</GreenGradient>
        </ChangeWrapper>
      )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  flex: 1;
  break-inside: avoid;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: rgba(255, 255, 255, 0.2);
  background-clip: padding-box;
  padding: 1.5rem;
  padding-bottom: 1rem;
  backdrop-filter: blur(8px);
  @media (min-width: 768px) {
    width: 360px;
  }
  width: 100%;
  height: fit-content;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.25rem;
`;
const ClickWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameWrapper = styled.h3`
  font-family: "satoshi", sans-serif;
  font-weight: 600;
  color: #1a202c;
`;

const EmailWrapper = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  color: #6b7280;
`;

const QuoteWrapper = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: "Satoshi", sans-serif;
  font-size: 0.875rem;
  color: #4b5563;
`;

const TagWrapper = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  background: linear-gradient(to right, #3b82f6, #60a5fa);
  background-clip: text;
  color: transparent;
`;

const ChangeWrapper = styled.div`
  margin-top: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 0.75rem;
`;

const GreenGradient = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  background-image: linear-gradient(to right, #68d391, #38b2ac);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;
export default QuoteCard;
