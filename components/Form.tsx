import Link from "next/link";
import styled from "styled-components";

import { Post } from "./QuoteCard";

interface FormProps {
  type: string;
  post: { quote: string; tag: string };
  setPost: React.Dispatch<React.SetStateAction<{ quote: string; tag: string }>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  return (
    <FormWrapper>
      <Tittle>
        <SpanWrapper>{type} Quote</SpanWrapper>
      </Tittle>
      <Paragraph>
        {type} and share your amazing quotes with your mates. Let&apos;s shine
        together in descriptive writing.
      </Paragraph>
      <QuoteForm onSubmit={handleSubmit}>
        <label>
          <LabelSpan>Your Quote</LabelSpan>
          <FormTextarea
            value={post.quote}
            onChange={(e) =>
              setPost({
                ...post,
                quote: e.target.value,
              })
            }
            placeholder="Paste your quote here"
            required
          ></FormTextarea>
        </label>
        <label>
          <LabelSpan>
            Tag{" "}
            <span style={{ fontWeight: 400 }}>
              #weather, #beach, #tears, #laugh
            </span>
          </LabelSpan>
          <FormInput
            value={post.tag}
            onChange={(e) =>
              setPost({
                ...post,
                tag: e.target.value,
              })
            }
            placeholder="#tag"
            required
          ></FormInput>
        </label>
        <CancelWrapper>
          <Link style={{ fontSize: "1.2rem", textDecoration: "none" }} href="/">
            Cancel
          </Link>
          <CancelBtn type="submit" disabled={submitting}>
            {submitting ? `${type}ing...` : type}
          </CancelBtn>
        </CancelWrapper>
      </QuoteForm>
    </FormWrapper>
  );
};

const FormWrapper = styled.section`
  width: 100%;
  max-width: 100%;
  justify-content: flex-start;
  flex-direction: column;
`;

const Tittle = styled.h1`
  text-align: left;
  margin-top: 1.25rem;
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.15;
  color: #000;

  @media (min-width: 640px) {
    font-size: 4rem;
  }
`;

const SpanWrapper = styled.span`
  background-image: linear-gradient(to right, #3b82f6, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

const Paragraph = styled.p`
  text-align: left;
  max-width: 28rem;
  margin-top: 1.25rem;
  font-size: 1.2rem;
  color: #6b7280;

  @media (min-width: 640px) {
    .desc {
      font-size: 1.45rem;
    }
  }
`;

const QuoteForm = styled.form`
  margin-top: 2.5rem;
  width: 100%;
  max-width: 42rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;
const LabelSpan = styled.span`
  font-family: "Satoshi", sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  color: #4a5568;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  display: flex;
  border-radius: 0.5rem;
  height: 200px;
  margin-top: 0.5rem;
  padding: 0.75rem;
  font-size: 1.2rem;
  color: #a0aec0;
  outline: none;
`;

const FormInput = styled.input`
  width: 100%;
  display: flex;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.75rem;
  font-size: 1.2rem;
  color: #718096;
  outline: 0;
`;

const CancelWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  margin-bottom: 1.25rem;
  gap: 1rem;
  font-size: 1.2rem;
`;

const CancelBtn = styled.button`
  padding: 2.5px 15px;
  font-size: 1.2rem;
  background-color: #ffc300;
  border-radius: 9999px;
  color: #003bff;
`;
export default Form;
