import { useContext, useEffect, useState } from "react";
import style from "./Bookmark.module.css";
import { UserContext } from "../../App";
import { useLocation } from "react-router-dom";
import StoryWrapper from "../../components/StoryWrapper/StoryWrapper";

function Bookmark() {
    const location = useLocation()

    const { viewStoryModal, setViewStoryModal, setSelectedStoryCatArray, setSelectedStoryCatIndex } = useContext(UserContext)

    const [bookmark, setBookmark] = useState(false)

    const openViewStoryModal = (story, index) => {
        setSelectedStoryCatArray(story) // seting array of objects of all stories of that categpry
        setSelectedStoryCatIndex(index) // setting cat array index 
        setViewStoryModal(!viewStoryModal) // View Story Modal Open
    }

    useEffect(() => {
        if (location.pathname === '/bookmark') setBookmark(!bookmark)
    }, [location.pathname])

    return (
        <div className={style.bookmark}>
            <StoryWrapper storyTitle={'Your Bookmarks'} bookmark={bookmark} />
        </div>
    )
}

export default Bookmark;