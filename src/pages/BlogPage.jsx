import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import Footer from "@/components/dashboard/Footer";
import BlogScroll from "@/components/blogs/BlogScroll";

const BlogPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-none">
        <Navbar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-none w-1/6">
          <Sidebar />
        </div>

        <div className="flex-1 grid grid-cols-12">
          <div className="col-span-10 overflow-y-auto">
            <BlogScroll />
            <Footer />
          </div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
