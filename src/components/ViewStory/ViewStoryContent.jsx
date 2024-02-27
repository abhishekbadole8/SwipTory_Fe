import style from "./ViewStory.module.css";
import { BsFillBookmarkFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";

function ViewStoryContent({ heading, description, updateBookmarkOrLike, isBookmarked, isLiked ,likesCount}) {
    return (
        <div className={style.viewStoryBottom}>
            <div className={style.storyContent}>
                <h6>{heading}</h6>
                <p>{description}</p>
            </div>

            <div className={style.bookmarkLikeBtn}>

                {/* Bookmark button*/}
                <div onClick={() => updateBookmarkOrLike('updateBookmarks')}>
                    <BsFillBookmarkFill color={isBookmarked ? "#085CFF" : "white"} id={style.icon} size={22} />
                </div>

                {/* Like button*/}
                <div onClick={() => updateBookmarkOrLike('updateLikes')}                                >
                    <AiFillHeart color={isLiked ? 'red' : "white"} id={style.icon} size={27} />
                    <span>{likesCount}</span>
                </div>

            </div>
        </div>
    )
}

export default ViewStoryContent