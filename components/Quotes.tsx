"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import QuoteCard from "./QuoteCard";
import { HandleTagClickFunction, Post } from "./QuoteCard";

interface listQuoteProps {
  data: Post[];
  handleTagClick: HandleTagClickFunction;
}

const ListQuote = ({ data, handleTagClick }: listQuoteProps) => {
  return (
    <ListWrapper>
      {data.map((post) => (
        <QuoteCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </ListWrapper>
  );
};

const QuotesDisplay = () => {
  const [allQuotes, setAllQuotes] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchQuotes = async () => {
    const response = await fetch("/api/quote");
    const data = await response.json();

    setAllQuotes(data);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const filterQuotes = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i");
    return allQuotes.filter((item: Post) => {
      const tags = (item?.tag || "").split(" ");
      return (
        // using the nullish coalescing operator (??) with an empty string
        // fallback value can ensure that the username property is treated as
        // a string even if it is undefined.
        regex.test(item?.creator?.username ?? "") ||
        tags.some((tag) => regex.test(tag)) ||
        regex.test(item?.quote)
      );
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchTimeout && clearTimeout(searchTimeout);
    setSearchText((e.target as HTMLInputElement).value);

    // debounce method "bundles" multiple keystrokes into a single call to the filter function,
    //stop unnecessary frequent updates
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterQuotes((e.target as HTMLInputElement).value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterQuotes(tagName);
    setSearchedResults(searchResult);
  };

  const clearTerms = () => {
    setSearchText("");
  };
  return (
    <QuoteWrapper>
      <FormWrapper>
        <InputWrapper
          type="text"
          placeholder="a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          // {...(searchText ? { required: true } : {})}
        />
        <ClearButton onClick={clearTerms}>Clear</ClearButton>
        {allQuotes && (
          <p>
            Total quotes: <span> {allQuotes.length}</span>
          </p>
        )}
      </FormWrapper>
      {/* Display all the quotes posted */}
      {searchText ? (
        <ListQuote data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <ListQuote data={allQuotes} handleTagClick={handleTagClick} />
      )}
    </QuoteWrapper>
  );
};

const ListWrapper = styled.div`
  margin-top: 4rem;
  & > * + * {
    margin-top: 1.5rem;
  }
  padding-top: 2rem;

  @media (min-width: 640px) {
    column-count: 2;
    column-gap: 1.2rem;
  }

  @media (min-width: 1280px) {
    column-count: 3;
  }
`;
const QuoteWrapper = styled.section`
  margin-top: 4rem;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormWrapper = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  & p {
    display: flex;
    align-items: center;

    & span {
      border-radius: 50%;
      background-color: #ed64ed;
      color: white;
      padding: 0.6rem;
      font-size: 1ren;
    }
  }
`;

const InputWrapper = styled.input`
  display: block;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  font-family: "satoshi", sans-serif;
  padding-left: 1.25rem;
  padding-right: 3rem;
  font-size: 1.2rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-weight: 500;

  &:focus {
    border-color: #000000;
    outline: none;
  }
`;

const ClearButton = styled.button`
  background-color: #ea4c89;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover,
  &:focus {
    background-color: #f082ac;
  }
`;
export default QuotesDisplay;
