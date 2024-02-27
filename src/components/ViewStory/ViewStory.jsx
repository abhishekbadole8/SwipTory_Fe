import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import style from "./ViewStory.module.css";
import { LuSend } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useSwipeable } from 'react-swipeable';
import useAuthStore from "../../store/authStore";
import ViewStoryContent from "./ViewStoryContent";
import Bars from "./Bars";
import ImageContainer from "./ImageContainer";

function ViewStory() {

    const { setIsAuthModal, viewStoryModal, setIsAuthModalValue, setViewStoryModal, selectedStoryCategoryArray,
        setSelectedStoryCategoryArray, selectedStoryCategoryIndex } = useContext(UserContext)

    const { user, isAuthenticated } = useAuthStore()

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

    const updateBookmarkOrLike = async (action) => {
        if (!isAuthenticated()) {
            setIsAuthModal(true)
            setIsAuthModalValue('Login')
            setViewStoryModal(false)
            return;
        }
        try {
            let response;
            if (action === "updateBookmarks" || action === "updateLikes") {
                response = await axios.patch('https://swiptory.up.railway.app/api/story/update/' + user?._id + '/' + currentStory?._id, { action }, {
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

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: currentStory.heading,
                    text: currentStory.description,
                    url: currentStory.images[currentImageIndex]
                });
                console.log("Shared successfully");
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            console.log("Error in share");
        }
    };

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

                    <ImageContainer imageUrl={currentStory?.images[currentImageIndex]}/>

                    <div className={style.viewStoryOuter}>

                        <div className={style.viewStoryUpper}>

                            {/* horizontal - bars */}
                            <Bars imagesCount={currentStory.images} currentImageIndex={currentImageIndex}/>

                            <div className={style.sendStoryBtn}>
                                <RxCross2 color="white" id={style.icon} size={24} onClick={() => setViewStoryModal(!viewStoryModal)} />
                                <LuSend color="white" id={style.icon} size={22} />
                            </div>

                        </div>

                        <ViewStoryContent updateBookmarkOrLike={updateBookmarkOrLike}
                            heading={currentStory?.heading} description={currentStory?.description}
                            isBookmarked={currentStory?.bookmarks.includes(user?._id)}
                            isLiked={currentStory?.likes.includes(user?._id)}
                            likesCount={currentStory.likes.length} />

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