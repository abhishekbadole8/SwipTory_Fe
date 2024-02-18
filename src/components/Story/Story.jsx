import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import style from "./Story.module.css";
import { UserContext } from "../../App";
import { TbEdit } from "react-icons/tb";

function Story({ story, onClick, storyTitle }) {

    const storyWrapperRef = useRef()

    const { addStoryModal, setAddStoryModal, updateEditStoryInputValue, } = useContext(UserContext)

    const { _id, images, heading, description } = story;

    // handle edit button
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

    return (
        <>
            <div className={style.storyWrapper} ref={storyWrapperRef}>

                <div className={style.parentDiv} >
                    <div className={style.story} onClick={() => onClick(story)}>
                        <div className={style.shadeTop} />
                        <img src={images[0]} alt="story" />
                        <div className={style.shadeBottom} />

                        <div className={style.content}>
                            <h5>{heading}</h5>
                            <p>{description}</p>
                        </div>
                    </div>

                    {storyTitle &&
                        (<div className={style.editButton} onClick={(e) => handleEditButtonClick(e, story)}>
                            <button><TbEdit size={18} />Edit</button>
                        </div>)}
                </div>

            </div>

            {/* 
            {visibleStory < story?.length && (
                <button className={style.seemorebtn} onClick={showMoreStories}>
                    See More
                </button>
            )} */}

        </>

    )
}

export default Story;