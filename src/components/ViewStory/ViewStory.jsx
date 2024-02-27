import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import style from "./ViewStory.module.css";
import { BsFillBookmarkFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { LuSend } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useSwipeable } from 'react-swipeable';
import useAuthStore from "../../store/authStore";

function ViewStory() {

    const { setIsAuthModal, viewStoryModal,setIsAuthModalValue, setViewStoryModal, selectedStoryCategoryArray,
        setSelectedStoryCategoryArray, selectedStoryCategoryIndex, BASE_STORY_URL, headers } = useContext(UserContext)

    const { user,isAuthenticated } = useAuthStore()

    const [progess, setProgress] = useState(0)

    const [currentStoryIndex, setCurrentStoryIndex] = useState(selectedStoryCategoryIndex); // local state to update current story

    const [currentImageIndex, setCurrentImageIndex] = useState(0) // Image index save here

    // Current story object save here
    const currentStory = selectedStoryCategoryArray[currentStoryIndex];

    const setCurrentStoryAndImage = (storyIndex, imageIndex) => {
        setCurrentStoryIndex(storyIndex);
        setCurrentImageIndex(imageIndex);
    };

    const goToNextStory = () => {
        const nextStoryIndex = (currentStoryIndex + 1) % selectedStoryCategoryArray.length;
        setCurrentStoryAndImage(nextStoryIndex, 0);
    };

    const goToPreviousStory = () => {
        const prevStoryIndex = currentStoryIndex === 0 ? selectedStoryCategoryArray.length - 1 : currentStoryIndex - 1;
        setCurrentStoryAndImage(prevStoryIndex, selectedStoryCategoryArray[prevStoryIndex].images.length - 1);
    };

    // Previous button logic
    const handlePrevious = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        } else {
            if (currentStoryIndex > 0) {
                goToPreviousStory();
            }
        }
    };

    // Next button logic
    const handleNext = () => {
        // if - image index
        if (currentImageIndex < currentStory.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            if (currentStoryIndex < selectedStoryCategoryArray.length - 1) {
                goToNextStory();
            }
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (currentImageIndex < currentStory.images.length - 1) {
                setCurrentImageIndex(currentImageIndex + 1);
            } else if (currentStoryIndex < selectedStoryCategoryArray.length - 1) {
                handleNext();
            }
        },
        onSwipedRight: () => {
            if (currentImageIndex > 0) {
                setCurrentImageIndex(currentImageIndex - 1);
            } else if (currentStoryIndex > 0) {
                handlePrevious();
            }
        },
    });

    const fetchBookmarkOrLike = async (action) => {
        if (!isAuthenticated()) {
            setIsAuthModal(true)
            setIsAuthModalValue('Login')
            setViewStoryModal(false)
            return;
        }
        try {
            let response;
            if (action === "updateBookmarks" || action === "updateLikes") {
                response = await axios.patch('http://localhost:5000/api/story/update/' + user?._id + '/' + currentStory?._id, { action }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                if (response) {
                    const fieldToUpdate = action === "updateBookmarks" ? "bookmarks" : "likes"
                    const updatedStory = { ...currentStory, [fieldToUpdate]: response.data['updated' + fieldToUpdate.charAt(0).toUpperCase() + fieldToUpdate.slice(1)] }
                    const updatedArray = selectedStoryCategoryArray.map((story, index) =>
                        index === currentStoryIndex ? updatedStory : story
                    );
                    setSelectedStoryCategoryArray(updatedArray)
                }
            }
        } catch (error) {
            console.log(`Error in bookmark add/remove:${error}`)
        }
    }

    // const handleShare = async () => {
    //     if (navigator.share) {
    //         try {
    //             await navigator.share({
    //                 title: currentStory.heading,
    //                 text: currentStory.description,
    //                 url: currentStory.images[currentImageIndex]
    //             });
    //             console.log("Shared successfully");
    //         } catch (error) {
    //             console.error("Error sharing:", error);
    //         }
    //     } else {
    //         console.log("Error in share");
    //     }
    // };

    //SetInterval for auto chnage slide
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev === 99) {
                    handleNext()
                    return 0;
                } else {
                    return prev + 1
                }
            })
        }, 75);
        return () => clearInterval(interval)
    }, [currentImageIndex])

    return (
        <div className={style.viewStory}>

            <div className={style.viewStoryWrapper} {...handlers}>

                <div className={style.viewPreviousStory}>
                    <i className="fa-solid fa-chevron-left fa-2xl" id={style.nextprevIcon} style={{ color: "#fff" }} onClick={handlePrevious}></i>
                </div>

                <div className={style.viewStoryImageCont}>

                    <div className={style.viewStoryInner}>
                        <div className={style.shadeTop} />
                        <img src={currentStory?.images[currentImageIndex]} alt="story" />
                        <div className={style.shadeBottom} />
                    </div>

                    <div className={style.viewStoryOuter}>

                        <div className={style.viewStoryUpper}>

                            {/* horizontal - bars */}
                            <div className={style.storyBar}>
                                {currentStory.images.map((_, i) => {
                                    return (
                                        <div className={style.storyBarWrapper} key={i} >
                                            <div className={`${style.barInner}  ${!(i < currentImageIndex + 1) ? style.barInner : style.barOuter}`} />
                                        </div>)
                                })}
                            </div>

                            <div className={style.sendStoryBtn}>
                                <RxCross2 color="white" id={style.icon} size={24} onClick={() => setViewStoryModal(!viewStoryModal)} />
                                <LuSend color="white" id={style.icon} size={22} />
                            </div>

                        </div>

                        <div className={style.viewStoryBottom}>
                            <div className={style.storyContent}>
                                <h6>{currentStory.heading}</h6>
                                <p>{currentStory.description}</p>
                            </div>

                            <div className={style.bookmarkLikeBtn}>

                                {/* Bookmark button*/}
                                <div onClick={() => fetchBookmarkOrLike('updateBookmarks')}>
                                    <BsFillBookmarkFill color={currentStory?.bookmarks.includes(user?._id) ? "#085CFF" : "white"} id={style.icon} size={22} />
                                </div>

                                {/* Like button*/}
                                <div onClick={() => fetchBookmarkOrLike('updateLikes')}                                >
                                    <AiFillHeart color={currentStory.likes.includes(user?._id) ? 'red' : "white"} id={style.icon} size={27} />
                                    <span>{currentStory.likes.length}</span>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className={style.viewNextStory}>
                    <i className="fa-solid fa-chevron-right fa-2xl" id={style.nextprevIcon} style={{ color: "#fff" }} onClick={handleNext}></i>
                </div>

            </div>
        </div >
    )
}

export default ViewStory;