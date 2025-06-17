import React, { useState, useEffect } from "react";

const BlogScroll = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token"); // Get JWT token from local storage

        const response = await fetch("http://localhost:5000/api/blogs", {
          headers: {
            Authorization: token, // Pass token in headers
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600">Loading blogs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      {blogs.map((blog, index) => (
        <div key={index} className="flex items-center mb-5 border-b pb-3">
          <div className="w-12 h-12 bg-gray-300 mr-5 flex-shrink-0">
            <img
              src={blog.logo}
              alt="logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read more
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogScroll;
