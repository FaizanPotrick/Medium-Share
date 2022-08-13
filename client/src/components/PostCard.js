import React, { useState } from "react";
import { useCookies } from "react-cookie";

function PostCard({
  post: {
    _id,
    user_id,
    user_email_address,
    name,
    description,
    mind_map_link,
    likes,
  },
}) {
  const [cookies] = useCookies(["user_id"]);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [userLike, setUserLike] = useState(() => {
    if (likes.includes(cookies.user_id)) {
      return true;
    }
    return false;
  });
  return (
    <div className="max-w-md container my-5 flex flex-col justify-between gap-2 bg-white rounded-2xl shadow-xl p-5 text-slate-900 border">
      <div>{user_email_address}</div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{name}</h1>
        <a
          href={mind_map_link}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          Mind Map
        </a>
      </div>
      <p className="text-slate-500">{description}</p>
      {/* <img className="w-full rounded-xl" src={mind_map_link} alt="image" /> */}
      <div className="flex justify-start items-center">
        <div className="flex space-x-1 items-center">
          <svg
            className="h-7 w-7 text-red-500 transition duration-100 cursor-pointer"
            viewBox="0 0 20 20"
            fill={!userLike ? "none" : "currentColor"}
            stroke="currentColor"
            onClick={async () => {
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
              // const data = await res.json();
              // console.log(data);
            }}
          >
            <path
              strokeWidth="1"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            />
          </svg>

          <span>{likesCount}</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
