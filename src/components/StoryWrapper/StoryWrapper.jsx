import style from "./StoryWrapper.module.css";
import Story from '../Story/Story';
import useStoryStore from '../../store/storyStore';
import { useContext } from "react";
import { UserContext } from "../../App";

function StoryWrapper({ storyTitle, category, bookmark }) {

    const { setViewStoryModal, setSelectedStoryCategoryArray, setSelectedStoryCategoryIndex } = useContext(UserContext)

    const { getUserStories, getStoryByCategory, getUserBookmarkedStories } = useStoryStore() // story store

    const handleCategoryClick = (selectedCategory, index) => {
        // here story title is Your Stories - title
        if (storyTitle === 'Your Bookmarks' ) {
            setSelectedStoryCategoryIndex(index)
            setSelectedStoryCategoryArray(getUserBookmarkedStories())
        }
        else if (storyTitle === 'Your Stories') {
            setSelectedStoryCategoryArray(getUserStories())
            setSelectedStoryCategoryIndex(index)
        } else {
            setSelectedStoryCategoryArray(getStoryByCategory(selectedCategory))
            setSelectedStoryCategoryIndex(index)
        }
        setViewStoryModal(true)
    }

    return (
        <div className={style.storyhead} >

            <h2 className={style.storytitle}>{storyTitle ? storyTitle : `Top Stories About ${category[0].toUpperCase() + category.slice(1)}`}</h2>

            <div className={style.storyWrapper}>

                {!bookmark && storyTitle ? (
                    getUserStories().map((story, index) => (
                        <Story key={index} index={index} story={story} storyTitle={storyTitle} handleCategoryClick={handleCategoryClick} />
                    ))
                ) : (
                    getStoryByCategory(category).map((story, index) => (
                        <Story key={index} index={index} story={story} handleCategoryClick={handleCategoryClick} />
                    ))
                )}

                {bookmark && (
                    getUserBookmarkedStories().map((story, index) => (
                        <Story key={index} index={index} story={story} handleCategoryClick={handleCategoryClick} />
                    )))}

            </div>

        </div>
    )
}

export default StoryWrapper