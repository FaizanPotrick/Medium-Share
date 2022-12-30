import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function AddPost() {
  const navigate = useNavigate();

  const [cookies] = useCookies(["user_id"]);

  useEffect(() => {
    if (
      cookies.user_id === undefined ||
      cookies.user_id === null ||
      cookies.user_id === ""
    ) {
      navigate(-1);
    }
  }, []);

  const [post, setPost] = useState({
    name: "",
    description: "",
    image: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAlert, setIsAlert] = useState({
    isShow: false,
    message: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const onUpload = (e) => {
    const { files } = e.target;
    setPost({ ...post, image: files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsAlert({
      isShow: false,
      message: "",
    });
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", post.name);
    formData.append("description", post.description);
    formData.append("image", post.image);
    const response = await fetch("/api/post/register", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setIsLoading(false);
    if (response.status === 200) {
      setPost({
        name: "",
        description: "",
        image: {},
      });
      navigate("/post/" + cookies.user_id);
    } else {
      setIsAlert({
        isShow: true,
        message: data,
      });
    }
  };

  return (
    <div className="h-[92vh] flex justify-center items-center">
      <div className="w-full max-w-xl rounded-xl shadow-md py-8 px-5 bg-gray-800 border-gray-700">
        <form
          className="space-y-3"
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          <div className="text-xl font-medium text-white">Add Post</div>
          {isAlert.isShow && (
            <div className="text-red-700">{isAlert.message}</div>
          )}
          <input
            type="text"
            name="name"
            className="border border-gray-500 text-sm rounded-lg w-full p-2 bg-gray-600 text-white"
            placeholder="Name"
            onChange={onChange}
            value={post.name}
            maxLength="150"
            required
          />
          <textarea
            id="message"
            rows="4"
            name="description"
            className="border border-gray-500 text-sm rounded-lg w-full p-2 bg-gray-600 text-white"
            placeholder="Description"
            onChange={onChange}
            value={post.description}
            maxLength="500"
            required
          />
          <input
            type="file"
            name="image"
            className="border border-gray-500 text-sm rounded-lg w-full bg-gray-600 text-white"
            onChange={onUpload}
            required
          />
          <button
            type="submit"
            className="w-full text-white font-medium rounded-lg text-sm px-5 py-2 text-center bg-blue-600"
          >
            {isLoading ? "Loading..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
