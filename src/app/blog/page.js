"use client"
import React, { useState, useEffect } from "react";

// Example fetch function to get blog data
const fetchPosts = async () => {
  const res = await fetch("/api/posts"); // Adjust this API path based on where your posts are fetched from
  const data = await res.json();
  return data;
};

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };

    getPosts();
  }, []);

  return (
    <div className="container">
      <h1>Our Blog</h1>
      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a href={`/blog/${post.id}`}>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Blog;
