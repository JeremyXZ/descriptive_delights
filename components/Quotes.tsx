"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import QuoteCard from "./QuoteCard";

const ListQuote = ({ data, handleTagClick }) => {
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
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchQuotes = async () => {
    const response = await fetch("/api/quote");
    const data = await response.json();

    setAllQuotes(data);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const filterQuotes = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allQuotes.filter(
      (item) =>
        regex.test(item?.creator?.username) ||
        regex.test(item?.tag) ||
        regex.test(item?.quote)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterQuotes(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterQuotes(tagName);
    setSearchedResults(searchResult);
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
        />
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
  /* margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  } */
  margin-top: 4rem;
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
  /* align-items: center; */
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
  font-size: 0.875rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-weight: 500;

  &:focus {
    border-color: #000000;
    outline: none;
  }
`;
export default QuotesDisplay;
