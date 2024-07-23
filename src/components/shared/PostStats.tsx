import { useUserContext } from "@/context/AuthContext";
import {
  useDeleteSavePost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutuations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
interface PostStatsProps {
  post: Models.Document;
  userId: string;
}
const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSaving } = useSavePost();
  const { mutate: deleteSavePost, isPending: isDeleting } = useDeleteSavePost();

  const { data: currentUser } = useGetCurrentUser();

  console.log("Post", post);
  console.log("Current User", currentUser);
  const savedPost = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPost);
  }, [currentUser]);

  function handleLikePost(e: React.MouseEvent) {
    e.stopPropagation();

    let newLikes = [...likes];

    let hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  }
  function handleSavePost(e: React.MouseEvent) {
    e.stopPropagation();

    if (savedPost) {
      setIsSaved(false);
      deleteSavePost({ savedRecordId: savedPost.$id });
    } else {
      savePost({ postId: post.$id, userId });
      setIsSaved(true);
    }
  }

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2 mr-5">
        {isSaving || isDeleting ? (
          <Loader />
        ) : (
          <img
            src={`${
              isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
            }`}
            alt="like"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
