import React, { useState } from "react";
import { useCookies } from "react-cookie";
import moment from "moment";

function PostCard({
  post: { _id, name, description, likes, createdAt, comments },
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
  const [seeMore, setSeeMore] = useState(false);

  const onComment = async (e) => {
    e.preventDefault();
    if (cookies.user_id === undefined || cookies.user_id === null) {
      return (window.location.href = "/login");
    }
    const response = await fetch(`/api/comment/post/${_id}/${comment}`);
    if (response.status === 200) {
      setIsFetching(true);
      setComment("");
    }
  };

  return (
    <div className="max-w-sm container my-5 flex flex-col justify-between gap-2 bg-white rounded-2xl shadow-inner drop-shadow-xl p-0 text-slate-900 border">
      <img
        className="w-full rounded-t-xl h-52"
        src={"http://localhost:3000" + "/api/image/" + _id}
        alt="not found"
      />
      <div className="px-5 mb-3 flex flex-col justify-between gap-1">
        <div className="text-xl md:text-2xl font-semibold">{name}</div>
        <div className="text-slate-500">
          {seeMore || description.length < 130
            ? description
            : description.slice(0, 130) + "..."}

          <span
            className={`${
              description.length < 130 ? "hidden" : "inline-block"
            } ml-2 text-blue-700 cursor-pointer text-sm`}
            onClick={() => {
              setSeeMore(!seeMore);
            }}
          >
            {!seeMore ? "show more" : "show less"}
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center">
            <svg
              className="h-7 w-7 text-red-500 transition duration-100 cursor-pointer"
              viewBox="0 0 20 20"
              fill={!userLike ? "none" : "currentColor"}
              stroke="currentColor"
              onClick={async () => {
                if (cookies.user_id === undefined || cookies.user_id === null) {
                  return (window.location.href = "/login");
                }
                const response = await fetch(`/api/post/like/${_id}`);
                if (response.status === 200) {
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
            <div className="ml-1">{likesCount}</div>
          </div>
          <div className="flex items-center">
            <svg
              className={`w-6 h-6 text-gray-700 ${
                isComment ? "fill-slate-400" : "fill-slate-50"
              } cursor-pointer`}
              stroke="currentColor"
              viewBox="0 0 20 20"
              onClick={() => setIsComment(!isComment)}
            >
              <path
                strokeWidth="1"
                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
              ></path>
            </svg>
            <div className="ml-1">{comments.length}</div>
          </div>
        </div>
        {isComment && (
          <div className="mt-3">
            <form className="flex" onSubmit={onComment}>
              <input
                type="search"
                className="p-1.5 w-full text-sm text-gray-900 bg-gray-100 rounded-l-lg border border-gray-200"
                placeholder="Add a comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                maxLength="200"
                required
              />
              <button
                type="submit"
                className="text-white border rounded-r-lg text-sm p-1.5 bg-blue-600 border-blue-600"
              >
                Add
              </button>
            </form>
            {[...comments].reverse().map((comment) => {
              return (
                <div className="mt-2" key={comment._id}>
                  <div className="flex justify-between items-center">
                    <div>{comment.user_email_address}</div>
                    <div className="text-xs text-slate-500">
                      {moment(comment.createdAt).format("DD MMM YY/hh:mm A")}
                    </div>
                  </div>
                  <div className="ml-4 text-gray-500">{comment.message}</div>
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-4 text-slate-500 text-sm flex justify-between items-center">
          <div>{moment(createdAt).format("DD MMM YYYY")}</div>
          <div>{moment(createdAt).format("hh:mm A")}</div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
