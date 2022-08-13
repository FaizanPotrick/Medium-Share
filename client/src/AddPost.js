import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function AddPost() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["user_id"]);
  if (cookies.user_id === undefined || cookies.user_id === null) {
    window.location.href = "/login";
  }
  const [post, setPost] = useState({
    name: "",
    description: "",
    mind_map_link: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const onChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/post/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    // const data = await res.json();
    // console.log(data);
    setIsLoading(false);
    if (res.status === 200) {
      setPost({
        name: "",
        description: "",
        mind_map_link: "",
      });
      navigate("/mypost");
    }
  };
  return (
    <div className="h-[92vh] flex justify-center items-center">
      <div className="w-full max-w-xl rounded-lg shadow-md p-8 bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={onSubmit}>
          <h5 className="text-xl font-medium text-white">Add Post</h5>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Name</label>
            <input
              type="test"
              name="name"
              className="border border-gray-500 text-sm rounded-lg w-full p-2.5 bg-gray-600 text-white"
              placeholder="Name"
              onChange={onChange}
              value={post.name}
              maxLength="150"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              id="message"
              rows="4"
              name="description"
              className="border border-gray-500 text-sm rounded-lg w-full p-2.5 bg-gray-600 text-white"
              placeholder="Description"
              onChange={onChange}
              value={post.description}
              maxLength="500"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
              Mind Map Link
            </label>
            <input
              type="text"
              name="mind_map_link"
              className="border border-gray-500 text-sm rounded-lg w-full p-2.5 bg-gray-600 text-white"
              placeholder="Mind Map Link"
              onChange={onChange}
              value={post.mind_map_link}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600"
          >
            {isLoading ? "Loading..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
