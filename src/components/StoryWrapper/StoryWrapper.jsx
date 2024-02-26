import style from "./StoryWrapper.module.css";
import Story from '../Story/Story';
import useAuthStore from '../../store/authStore';
import useStoryStore from '../../store/storyStore';

function StoryWrapper({ storyTitle, openViewStoryModal, category, bookmark }) {

    // const { user } = useAuthStore()

    const { getUserStories, getStoryByCategory, getUserBookmarkedStories } = useStoryStore()

    return (
        <div className={style.storyhead} >

            <h2 className={style.storytitle}>{storyTitle ? storyTitle : `Top Stories About ${category[0].toUpperCase() + category.slice(1)}`}</h2>

            <div className={style.storyWrapper}>

                {!bookmark && storyTitle ? (
                    getUserStories().map((story, index) => (
                        <Story key={index} story={story} storyTitle={storyTitle} onClick={(categoryStories, index) => openViewStoryModal(categoryStories, index)} />
                    ))
                ) : (
                    getStoryByCategory(category).map((story, index) => (
                        <Story key={index} story={story} onClick={(categoryStories, index) => openViewStoryModal(categoryStories, index)} />
                    ))
                )}

                {bookmark && (
                    getUserBookmarkedStories().map((story, index) => (
                        <Story key={index} story={story} />
                    )))}

            </div>

        </div>
    )
}

export default StoryWrapper