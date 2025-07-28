import React, { useState } from 'react';
import clsx from "clsx";
import axiosInstance from '../../../utils/axiosInstance';
import { API_PATHS } from '../../../utils/apiPaths';
import { PiHandsClapping } from 'react-icons/pi';
import { LuMessageCircleDashed } from 'react-icons/lu';

export default function LikeCommentButton({ postId, likes, comments }) {
  const [postLikes, setPostLikes] = useState(likes || 0);
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleLikeClick = async () => {
    if (!postId) return;

    try {
      const response = await axiosInstance.post(API_PATHS.POSTS.LIKE(postId), {
        action: liked ? 'unlike' : 'like',
      });

      if (response.data) {
        setPostLikes(prev => liked ? prev - 1 : prev + 1);
        setLiked(!liked);

        if (!liked) {
          setAnimating(true);
          setTimeout(() => setAnimating(false), 500);
        }
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 py-2.5 px-4 md:py-3 md:px-5 
                 bg-black text-white rounded-full shadow-lg flex items-center 
                 space-x-4 sm:space-x-6 text-xs sm:text-sm md:text-base"
    >
      <button
        className="flex items-center gap-1 sm:gap-2 cursor-pointer"
        onClick={handleLikeClick}
      >
        <PiHandsClapping
          className={clsx(
            "text-lg sm:text-xl md:text-2xl transition-transform duration-300",
            liked && "text-cyan-500",
            animating && "scale-125"
          )}
        />
        <span className="font-medium">{postLikes}</span>
      </button>

      <div className="h-4 sm:h-5 md:h-6 w-px bg-gray-500"></div>

      <button className="flex items-center gap-1 sm:gap-2">
        <LuMessageCircleDashed className="text-lg sm:text-xl md:text-2xl" />
        <span className="font-medium">{comments}</span>
      </button>
    </div>
  );
}
