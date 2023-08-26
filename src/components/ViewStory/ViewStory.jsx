import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import style from "./ViewStory.module.css";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { FcNext } from "react-icons/fc";
import { BsFillBookmarkFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { LuSend } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

function ViewStory() {

    const { token, loginModal, setLoginModal, viewStoryModal, setViewStoryModal, selectedStoryCatArray, setSelectedStoryCatArray, selectedStoryCatIndex,
        BASE_STORY_URL, headers, isLiked, setIsLiked, decode } = useContext(UserContext)

    // selectedStoryCatArray is array of object's and each obj is story of that particular category

    // selectedStoryCatIndex is clicked story index
    const [currentStoryIndex, setCurrentStoryIndex] = useState(selectedStoryCatIndex);

    const [currentImageIndex, setCurrentImageIndex] = useState(0) // image index save here

    // Current story object save here
    const currentStory = selectedStoryCatArray[currentStoryIndex]

    const handleNextSlide = () => {
        if (currentImageIndex < currentStory.images.length - 1) {
            setCurrentImageIndex(prev => prev + 1)
        } else {
            setCurrentStoryIndex(prev => prev + 1)
            setCurrentImageIndex(0)
        }
    };

    // Pending Work
    const handlePreviousSlide = () => {
        if (currentImageIndex + 1 < currentStory.images.length) {
            setCurrentImageIndex(prev => ((prev <= 0) ? 0 : prev) - 1)
        } else {
            setCurrentStoryIndex(prev => ((prev <= 0) ? 0 : prev) - 1)
        }
    };

    const fetchBookmarkOrLike = async (action) => {
        try {
            let response;
            if (action === "updateBookmarks" || action === "updateLikes") {
                response = await axios.patch(BASE_STORY_URL + '/edit/' + decode?.user?._id + '/' + currentStory?._id, { action }, headers)
                if (response) {
                    const fieldToUpdate = action === "updateBookmarks" ? "bookmarks" : "likes"
                    const updatedStory = { ...currentStory, [fieldToUpdate]: response.data['updated' + fieldToUpdate.charAt(0).toUpperCase() + fieldToUpdate.slice(1)] }
                    const updatedArray = selectedStoryCatArray.map((story, index) =>
                        index === currentStoryIndex ? updatedStory : story
                    );
                    setSelectedStoryCatArray(updatedArray)
                }
            }
        } catch (error) {
            console.log(`Error in bookmark add/remove:${error}`)
        }
    }

    return (
        <div className={style.viewStory}>

            <div className={style.viewStoryWrapper}>

                <div className={style.viewPreviousStory}>
                    <i className="fa-solid fa-chevron-left fa-2xl" id={style.nextprevIcon} style={{ color: "#fff" }} onClick={handlePreviousSlide}></i>
                </div>

                <div className={style.viewStoryImageCont}>

                    <div className={style.viewStoryInner}>
                        <div className={style.shadeTop} />
                        <img src={currentStory?.images[currentImageIndex]} alt="story" />
                        <div className={style.shadeBottom} />
                    </div>

                    <div className={style.viewStoryOuter}>

                        <div className={style.viewStoryUpper}>

                            <div className={style.storyBar}>
                                {currentStory.images.map((_, i) => {
                                    return (
                                        <div className={style.storyBarWrapper} key={i} >
                                            <div className={style.barInner} />
                                            <div className={style.barOuter} />
                                        </div>
                                    )
                                })}
                            </div>

                            <div className={style.sendStoryBtn}>
                                <RxCross2 color="white" id={style.icon} size={24} onClick={() => setViewStoryModal(!viewStoryModal)} />
                                <LuSend color="white" id={style.icon} size={22} />
                            </div>

                        </div>

                        <div className={style.viewStoryBottom}>
                            <div className={style.storyContent}>
                                <h6>{currentStory?.heading}</h6>
                                <p>{currentStory?.description}</p>
                            </div>

                            <div className={style.bookmarkLikeBtn}>

                                {/* Bookmark button*/}
                                <div onClick={() => {
                                    fetchBookmarkOrLike("updateBookmarks")
                                    if (!token) {
                                        setViewStoryModal(!viewStoryModal)
                                        setLoginModal(!loginModal)
                                    }
                                }
                                }>
                                    <BsFillBookmarkFill color={currentStory.bookmarks.includes(decode?.user?._id) ? "#085CFF" : "white"} id={style.icon} size={22} />
                                </div>

                                {/* Like button*/}
                                <div onClick={() => {
                                    fetchBookmarkOrLike("updateLikes")
                                    if (!token) {
                                        setViewStoryModal(!viewStoryModal)
                                        setLoginModal(!loginModal)
                                    }
                                }}>
                                    <AiFillHeart color={currentStory.likes.includes(decode?.user?._id) ? "red" : "white"} id={style.icon} size={27} />
                                    <span>{currentStory.likes.length}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.viewNextStory}>
                    <i className="fa-solid fa-chevron-right fa-2xl" id={style.nextprevIcon} style={{ color: "#fff" }} onClick={handleNextSlide}></i>
                </div>

            </div>
        </div >
    )
}

export default ViewStory;