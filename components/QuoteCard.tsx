"use client";
import styled from "styled-components";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { HandleEditFunction, HandleDeleteFunction } from "./Profile";
import { type CustomSessionUser } from "../app/api/auth/[...nextauth]/route";

export type HandleTagClickFunction = (tagname: string) => void;

interface Creator {
  _id: string;
  username: string;
  image: string;
}

export interface Post {
  _id: string;
  creator?: Creator;
  tag?: string;
  quote: string;
}

interface QuoteCardProps {
  post: Post;
  handleEdit?: HandleEditFunction;
  handleDelete?: HandleDeleteFunction;
  handleTagClick?: HandleTagClickFunction;
}

const QuoteCard = ({
  post,
  handleEdit,
  handleDelete,
  handleTagClick,
}: QuoteCardProps) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    if (post?.creator?._id === (session?.user as CustomSessionUser)?.id)
      return router.push("/profile");

    router.push(`/profile/${post.creator?._id}?name=${post.creator?.username}`);
  };

  const tagArr = (post?.tag || "").split(" ");
  // const tags = tagArr
  //   .map((item) => <span key={item}>{"#" + item}</span>)
  //   .join(" ");

  return (
    <CardWrapper>
      <ProfileWrapper>
        <ClickWrapper onClick={handleProfileClick}>
          <Image
            src={post?.creator?.image ?? "/assets/images/dummy_user.jpg"}
            alt="user_image"
            width={40}
            height={40}
            style={{ borderRadius: "9999px", objectFit: "contain" }}
          />

          <FlexWrapper>
            <NameWrapper>{post?.creator?.username}</NameWrapper>
            {/* <EmailWrapper>{post?.creator?.email}</EmailWrapper> */}
          </FlexWrapper>
        </ClickWrapper>
      </ProfileWrapper>

      <QuoteWrapper>{post.quote}</QuoteWrapper>
      <TagWrapper>
        {tagArr.map((item) => (
          <span
            key={item}
            onClick={(e) => handleTagClick && handleTagClick(item)}
          >
            {item + " "}
          </span>
        ))}
      </TagWrapper>

      {(session?.user as CustomSessionUser)?.id === post?.creator?._id &&
        pathName === "/profile" && (
          <ChangeWrapper>
            <GreenGradient onClick={() => handleEdit && handleEdit(post)}>
              Edit
            </GreenGradient>
            <RedGradient onClick={() => handleDelete && handleDelete(post)}>
              Delete
            </RedGradient>
          </ChangeWrapper>
        )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  flex: 1;
  break-inside: avoid;
  border: 1px solid #d1d5db;
  background-color: rgba(255, 255, 255, 0.2);
  background-clip: padding-box;
  padding: 2.5rem;
  backdrop-filter: blur(8px);
  width: 100%;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  white-space: normal;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  @media (min-width: 768px) {
    width: 360px;
    /* border-radius: 50%; */
  }
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
  margin-bottom: 0.5em;
  justify-self: flex-start;
  margin-top: -0.023em;
`;

const EmailWrapper = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: -0.5em;
`;

const QuoteWrapper = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: "Satoshi", sans-serif;
  font-size: 1.2rem;
  color: #4b5563;
  white-space: normal; /* Allow text to wrap within the circle */
  word-wrap: break-word;
  padding: 0 2rem;
`;

const TagWrapper = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  /* background: linear-gradient(to right, #3b82f6, #60a5fa); */
  background-clip: text;
  color: black;
  padding: 0.5rem;
  border-radius: 10px;
`;

const ChangeWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid #e5e7eb;
  /* padding-top: 0.75rem; */
`;

const GreenGradient = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  background-image: linear-gradient(to right, #48bb78, #4299e1);
  /* background-image: linear-gradient(to right, #c7d2fe, #a78bfa, #6b46c1); */
  /* background-image: linear-gradient(to right, #e53e3e, #ecc94b, #f6e05e); */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const RedGradient = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  background: linear-gradient(to right, rgb(204, 102, 204), rgb(233, 30, 99));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;
export default QuoteCard;
