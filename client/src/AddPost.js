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
    photo: {},
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
    setPost({ ...post, photo: files[0] });
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
    formData.append("mind_map_link", post.mind_map_link);
    formData.append("photo", post.photo);
    const res = await fetch("/api/post/registration", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setIsLoading(false);
    if (res.status === 200) {
      setPost({
        name: "",
        description: "",
        mind_map_link: "",
      });
      navigate("/mypost");
    } else {
      setIsAlert({
        isShow: true,
        message: data,
      });
    }
  };
  return (
    <div className="h-[92vh] flex justify-center items-center">
      <div className="w-full max-w-xl rounded-lg shadow-md p-8 bg-gray-800 border-gray-700">
        <form
          className="space-y-6"
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          <h5 className="text-xl font-medium text-white">Add Post</h5>
          {isAlert.isShow && (
            <div className="text-red-700">{isAlert.message}</div>
          )}
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
          <div className="grid md:grid-cols-2 gap-2">
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
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">
                Upload Photo
              </label>
              <input
                type="file"
                name="photo"
                className="border border-gray-500 text-sm rounded-lg w-full bg-gray-600 text-white"
                onChange={onUpload}
                required
              />
            </div>
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
