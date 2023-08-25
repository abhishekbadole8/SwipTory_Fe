import { useContext, useEffect, useState } from "react";
import style from "./Bookmark.module.css";
import Story from "../../components/Story/Story";
import { UserContext } from "../../App";
import { useLocation } from "react-router-dom";

function Bookmark() {
    const location = useLocation()

    const { allUserStories, decode } = useContext(UserContext)

    const [bookmark, setBookmark] = useState(false)

    const userBookmarkArray = decode?.user?.stories_bookmarked.map(sto => sto.storyId) // here array of strings - storyId's

    const userBookmarks = allUserStories.filter((story) => userBookmarkArray.includes(story._id)) // here array of obj - stories relation to user bookmark

    useEffect(() => {
        if (location.pathname == '/bookmark') {
            setBookmark(!bookmark)
        }
    }, [location.pathname])

    return (
        <div className={style.bookmark}>
            <Story bookmark={bookmark} userBookmarks={userBookmarks} />
        </div>
    )
}

export default Bookmark;