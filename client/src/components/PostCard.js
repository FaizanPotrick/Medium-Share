import React, { useState } from "react";
import { useCookies } from "react-cookie";
import moment from "moment";

function PostCard({
  post: {
    _id,
    name,
    description,
    mind_map_link,
    photo_url,
    likes,
    createdAt,
    user,
    comments,
  },
  setIsFetching,
}) {
  const [cookies] = useCookies(["user_id"]);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [userLike, setUserLike] = useState(() => {
    if (likes.includes(cookies.user_id)) {
      return true;
    }
    return false;
  });
  const [isComment, setIsComment] = useState(false);
  const [comment, setComment] = useState("");
  const onComment = async (e) => {
    e.preventDefault();
    if (cookies.user_id === undefined || cookies.user_id === null) {
      return (window.location.href = "/login");
    }
    const res = await fetch(`/api/comment/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: _id,
        comment: comment,
      }),
    });
    if (res.status === 200) {
      setIsFetching(true);
      setComment("");
    }
  };
  return (
    <div className="max-w-md container my-5 flex flex-col justify-between gap-2 bg-white rounded-2xl shadow-xl p-5 text-slate-900 border">
      <div>{user.email_address}</div>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">{name}</div>
        <a
          href={mind_map_link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          Mind Map
        </a>
      </div>
      <p className="text-slate-500">{description}</p>
      <img className="w-full rounded-xl" src={photo_url} alt="image" />
      <div className="flex justify-between items-center">
        <div className="flex space-x-1 items-center">
          <svg
            className="h-7 w-7 text-red-500 transition duration-100 cursor-pointer"
            viewBox="0 0 20 20"
            fill={!userLike ? "none" : "currentColor"}
            stroke="currentColor"
            onClick={async () => {
              if (cookies.user_id === undefined || cookies.user_id === null) {
                return (window.location.href = "/login");
              }
              const res = await fetch(`/api/post/likes`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  post_id: _id,
                }),
              });
              if (res.status === 200) {
                setLikesCount(likesCount + 1);
                setUserLike(true);
              }
            }}
          >
            <path
              strokeWidth="1"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            />
          </svg>
          <span>{likesCount}</span>
        </div>
        <svg
          className={`w-6 h-6 ${isComment ? "" : "rotate-180"} cursor-pointer`}
          onClick={() => setIsComment(!isComment)}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"></path>
        </svg>
      </div>
      {isComment && (
        <div className="mt-2">
          <form className="flex" onSubmit={onComment}>
            <input
              type="search"
              className="p-2 w-full text-sm text-gray-900 bg-gray-100 rounded-l-lg border border-gray-200"
              placeholder="Add a comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              maxLength="200"
              required
            />
            <button
              type="submit"
              className="text-white border rounded-r-lg text-sm p-2 bg-blue-600 border-blue-600"
            >
              Add
            </button>
          </form>
          {[...comments].reverse().map((comment) => {
            return (
              <div className="mt-4" key={comment._id}>
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">
                    {comment.user_email_address}
                  </h1>
                  <div className="text-sm">
                    {moment(comment.createdAt).format("DD MMM YYYY")}
                  </div>
                </div>
                <p className=" ml-2 mt-1 text-gray-600">{comment.message}</p>
              </div>
            );
          })}
        </div>
      )}
      <div className="text-sm">{moment(createdAt).format("DD MM YYYY")}</div>
    </div>
  );
}

export default PostCard;
