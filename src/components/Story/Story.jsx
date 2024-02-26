import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import style from "./Story.module.css";
import { UserContext } from "../../App";
import { TbEdit } from "react-icons/tb";
import useStoryStore from "../../store/storyStore";

function Story({ story, onClick, storyTitle }) {

    const storyWrapperRef = useRef()
    const { setUpdateStoryInputValue } = useStoryStore()

    const { addStoryModal, setAddStoryModal, isUpdate, setIsUpdate, } = useContext(UserContext)


    const { _id, images, heading, description } = story;

    const handleUpdateButtonClick = (e, story) => {
        e.stopPropagation()
        setIsUpdate(true)
        setAddStoryModal(true)
        setUpdateStoryInputValue(story)
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
                        (<div className={style.editButton} onClick={(e) => handleUpdateButtonClick(e, story)}>
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