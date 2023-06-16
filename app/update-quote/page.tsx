"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";
import { UserProps } from "@/components/Provider";

const EditQuotes = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const quoteId = searchParams.get("id");

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ quote: "", tag: "" });

  useEffect(() => {
    const getQuotes = async () => {
      const response = await fetch(`/api/quote/${quoteId}`);
      const data = await response.json();

      setPost({
        quote: data.quote,
        tag: data.tag,
      });
    };

    if (quoteId) getQuotes();
  }, [quoteId]);

  const updateQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!quoteId) return alert("Missing QuoteId!");

    try {
      const response = await fetch(`/api/quote/${quoteId}`, {
        method: "PATCH",
        body: JSON.stringify({
          quote: post.quote,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
        // const data = await response.json();
        // console.log(data);
        // router.push("/");
        console.log("response from update-quote", response);
      }
    } catch (error) {
      console.log(error);
      // console.log("Error:", response.status);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateQuote}
    />
  );
};

export default EditQuotes;
