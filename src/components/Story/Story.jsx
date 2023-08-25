import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./Story.module.css";
import { UserContext } from "../../App";
import { TbEdit } from "react-icons/tb";
import axios from "axios";

function Story({ userStory, category, onClick, bookmark, userBookmarks }) {
    const location = useLocation()

    const { addStoryModal, setAddStoryModal, updateEditStoryInputValue, BASE_STORY_URL } = useContext(UserContext)

    const [story, setStory] = useState([])

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
    }, [category, userStory, BASE_STORY_URL, bookmark])

    return (

        <div className={style.storyContainer} >

            <h4>{bookmark && 'Your Bookmark'}</h4>

            <div className={`${bookmark ? style.bookmarkStoryWrapper : style.storyWrapper} `} >

                {story?.map((individualStory, index) => {
                    const { _id, images, heading, description } = individualStory;

                    return (
                        <div className={style.parentDiv}>
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

            <button className={style.seemorebtn}>See more</button>

        </div >
    )
}

export default Story;