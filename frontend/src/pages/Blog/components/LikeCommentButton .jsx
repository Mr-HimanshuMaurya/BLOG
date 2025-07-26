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
      // toggle like/unlike
      const response = await axiosInstance.post(API_PATHS.POSTS.LIKE(postId), {
        action: liked ? 'unlike' : 'like',
      });

      if (response.data) {
        setPostLikes(prev => liked ? prev - 1 : prev + 1);
        setLiked(!liked);

        // Trigger animation only on like
        if (!liked) {
          setAnimating(true);
          setTimeout(() => {
            setAnimating(false);
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className='fixed bottom-8 right-8 py-3 px-5 bg-black text-white rounded-full shadow-lg flex items-center'>
      <button
        className='flex items-end gap-2 cursor-pointer'
        onClick={handleLikeClick}
      >
        <PiHandsClapping
          className={clsx(
            "text-[22px] transition-transform duration-300",
            liked && "text-cyan-500",
            animating && "scale-125"
          )}
        />
        <span className='text-base font-medium leading-4'>{postLikes}</span>
      </button>

      <div className='h-6 w-px bg-gray-500 mx-5'></div>

      <button className='flex items-end gap-2'>
        <LuMessageCircleDashed className='text-[22px]' />
        <span className='text-base font-medium leading-4'>{comments}</span>
      </button>
    </div>
  );
}
