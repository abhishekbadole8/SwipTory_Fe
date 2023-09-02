import style from "./UserStory.module.css"
import { useContext } from "react"
import { UserContext } from "../../App"
import Story from "../Story/Story"

function UserStory({ openViewStoryModal }) {

    const { token, allUserStories, decode } = useContext(UserContext)

    const userStory = allUserStories.filter(user => user.userId === decode?.user?._id)

    return (
        <>
            {userStory.length > 0 &&
                <div className={`${style.storyhead} ${!token && style.yStory}`} >
                    {userStory.length > 0 && token && <h2 className={style.storytitle}>Your Stories</h2>}
                    
                    <Story userStory={userStory}  onClick={(categoryStories, ind) => openViewStoryModal(categoryStories, ind)} />
                </div>}
        </>
    )
}

export default UserStory;