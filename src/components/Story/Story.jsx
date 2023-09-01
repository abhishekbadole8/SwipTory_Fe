import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import style from "./Story.module.css";
import { UserContext } from "../../App";
import { TbEdit } from "react-icons/tb";

function Story({ userStory, category, onClick, bookmark, userBookmarks }) {

    const storyWrapperRef = useRef()

    const { addStoryModal, setAddStoryModal, updateEditStoryInputValue, BASE_STORY_URL } = useContext(UserContext)

    const [story, setStory] = useState([])

    const [visibleStory, setVisibleStory] = useState(6) // stories to visible
    const [storyWrapperWidth, setStoryWrapperWidth] = useState(0)
    const storyWidth = 201;
    const gap = 33.6

    const handleEditButtonClick = (e, singleStory) => {
        e.stopPropagation()
        updateEditStoryInputValue({
            storyId: singleStory._id,
            heading: singleStory.heading,
            description: singleStory.description,
            category: singleStory.category,
            images: singleStory.images,
        })
        setAddStoryModal(!addStoryModal)
    }
    
    const showMoreStories = () => {
        setVisibleStory(prevVisible => prevVisible + prevVisible)
    }

    // for story fetching  are per category
    useEffect(() => {
        const fetchStoryCategoryWise = async () => {
            try {
                let response;
                if (category) {
                    response = await axios.get(BASE_STORY_URL, {
                        params: { category },
                    });
                }
                else if (bookmark) {
                    setStory(userBookmarks)
                }
                else {
                    setStory(userStory)
                    return;
                }
                if (response) {
                    const data = response.data
                    setStory(data)
                }
            }
            catch (error) {
                console.log(`Error in category product fetch:${error}`)
            }
        }
        fetchStoryCategoryWise()
    }, [category, userStory, BASE_STORY_URL, bookmark, addStoryModal])

    // calculate total width of wrapper continer
    useEffect(() => {
        const handleResize = () => {
            const newStoryWrapperrWidth = storyWrapperRef.current.offsetWidth;
            setStoryWrapperWidth(newStoryWrapperrWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    //set visiblestory no. to display
    useEffect(() => {
        const calculateVisibleStories = () => {
            if (storyWrapperWidth > 0) {
                const maxVisibleStories = Math.floor(storyWrapperWidth / (storyWidth + gap))
                setVisibleStory(Math.min(maxVisibleStories, story.length))
            }
        }
        calculateVisibleStories()
    }, [storyWrapperWidth, story])

    return (

        <div className={style.storyContainer} >

            <h4>{bookmark && 'Your Bookmark'}</h4>

            <div className={`${bookmark ? style.bookmarkStoryWrapper : style.storyWrapper} `} ref={storyWrapperRef}>

                {story?.slice(0, visibleStory).map((individualStory, index) => {
                    const { _id, images, heading, description } = individualStory;

                    return (
                        <div className={style.parentDiv} key={_id}>
                            <div className={style.story} key={_id} onClick={() => onClick(story, index)}>
                                <div className={style.shadeTop} />
                                <img src={images[0]} alt="story" />
                                <div className={style.shadeBottom} />

                                <div className={style.content}>
                                    <h5>{heading}</h5>
                                    <p>{description}</p>
                                </div>
                            </div>

                            <div className={style.editButton} onClick={(e) => handleEditButtonClick(e, individualStory)}>
                                {userStory && <button><TbEdit size={18} />Edit</button>}
                            </div>
                        </div>
                    )
                })}

            </div>

            {visibleStory < story?.length && (
                <button className={style.seemorebtn} onClick={showMoreStories}>
                    See More
                </button>
            )}

        </div >
    )
}

export default Story;