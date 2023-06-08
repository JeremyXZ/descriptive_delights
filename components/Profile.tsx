import QuoteCard from "./QuoteCard";
import styled from "styled-components";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <Wrapper>
      <HeadWrapper>
        <BlueGradient>{name} Profile</BlueGradient>
      </HeadWrapper>
      <Description>{desc}</Description>

      <ListWrapper>
        {data.map((post) => (
          <QuoteCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
`;

const HeadWrapper = styled.h1`
  margin-top: 1.25rem;
  font-size: 3.75rem;
  font-weight: 800;
  line-height: 1.15;
  color: #000000;
  text-align: left;
  @media (min-width: 640px) {
    font-size: 4rem;
  }
`;
const BlueGradient = styled.span`
  background-image: linear-gradient(to right, #3b82f6, #60a5fa);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

const Description = styled.p`
  margin-top: 1.25rem;
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 42rem;
  text-align: left;

  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
`;

const ListWrapper = styled.div`
  margin-top: 2.5rem;
  & > * + * {
    margin-top: 1.5rem;
  }
  padding-top: 2rem;

  @media (min-width: 640px) {
    column-count: 2;
    column-gap: 1.5rem;
  }

  @media (min-width: 1280px) {
    column-count: 3;
  }
`;

export default Profile;
