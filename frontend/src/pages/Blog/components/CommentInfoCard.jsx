import React, { useContext, useState } from 'react'
import { UserContex } from '../../../context/userContext'
import axiosInstance from '../../../utils/axiosInstance';
import { API_PATHS } from '../../../utils/apiPaths';
import toast from 'react-hot-toast';
import { LuChevronDown, LuReply } from 'react-icons/lu';
import CommentReplyInput from '../../../components/Inputs/CommentReplyInput';
import { comment } from '@uiw/react-md-editor';
import moment from 'moment';

export default function CommentInfoCard({
    commentId,
    authorName,
    authorPhoto,
    content,
    updatedOn,
    post,
    replies,
    getAllComments,
    onDelete
}) {

    const {user, setOpenAuthForm} = useContext(UserContex);
    
    const [replyText, setReplyText] = useState("");

    const [showReplyForm, setShowReplyForm]= useState(false);
    const [showSubReplies, setShowSubReplies] = useState(false);

    //Handles canceling a reply
    const handleCancelReply = ()=>{
        setReplyText("");
        setShowReplyForm(false);
    };

    //Add Reply 
    const handleAddReply = async ()=>{
        try{
            const response = await axiosInstance.post(
        API_PATHS.COMMENTS.ADD(post._id),
        {
            content: replyText,
            parentComment: commentId,
        }
    );
    toast.success("Reply added successfully");

    setReplyText("");
    setShowReplyForm(false)
    getAllComments();
    }catch(error){
        console.error("Error adding reply:", error);
    }
  };

  return (
    <div className=''>
        <div className=''>
            <div className=''>
                <div className=''>
                    <img
                    src={authorPhoto}
                    alt={authorName}
                    className=''
                    />

                    <div className=''>
                        <div className=''>
                            <h3 className=''>
                                @{authorName}
                            </h3>
                            <LuDot className=""/>
                            <span className=''>
                                {updatedOn}
                            </span>
                        </div>

                        <p className=''>{content}</p>

                        <div className=''>
                            {!isSubReply && (
                                <>
                                <button 
                                className=''
                                onClick={()=>{
                                    if(!user){
                                        console.log("USER", user);
                                        setOpenAuthForm(true)
                                        return;
                                    }
                                    setShowReplyForm((prevState)=> !prevState)
                                }}
                                >
                                    <LuReply/> Reply
                                </button>

                                <button 
                                className=''
                                onClick={()=> 
                                    setShowSubReplies((prevState)=> !prevState)
                                }
                                >
                                    {replies?.length || 0}{" "}
                                    <LuChevronDown
                                    className={`${showSubReplies ? "rotate-180": ""}`}
                                    />
                                </button>{" "}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {!isSubReply && showReplyForm && (
            <CommentReplyInput
            user={user}
            authorName={authorName}
            content={content}
            replyText={replyText}
            setReplyText={setReplyText}
            handleAddReply={handleAddReply}
            handleCancelReply={handleCancelReply}
            disableAutoGen
            />
        )}

        {showSubReplies && 
        replies?.length> 0 && 
        replies.map((comment, index)=>(
            <div key={comment._id} className={`ml-5 ${index == 0 ? "mt-5": ""}`}>
                <CommentInfoCard
                authorName={comment.author.name}
                authorPhoto={comment.author.profileImageUrl}
                content={comment.content}
                post={comment.post}
                replies={comment.replies || []}
                isSubReply
                updatedOn={
                    comment.updatedAt
                    ? moment(comment.updatedAt).format("Do MMM YYYY")
                    : "-"
                }
                onDelete={()=>onDelete(comment._id)}
                />
            </div>
        ))
        }
    </div>
  )
}
