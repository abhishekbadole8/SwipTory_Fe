import React, { useEffect } from 'react'
import style from "./StoryWrapper.module.css";
import Story from '../Story/Story';
import useAuthStore from '../../services/authStore';
import useStoryStore from '../../services/storyStore';

function StoryWrapper({ storyTitle, openViewStoryModal, category }) {

    const { user } = useAuthStore()

    const { getUserStories, getStoryByCategory } = useStoryStore()

    return (
        <div className={style.storyhead} >

            <h2 className={style.storytitle}>{storyTitle ? storyTitle : `Top Stories About ${category[0].toUpperCase() + category.slice(1)}`}</h2>

            <div className={style.storyWrapper}>

                {storyTitle ? (
                    getUserStories(user?._id).map((story, index) => (
                        <Story key={index} story={story} storyTitle={storyTitle} onClick={(categoryStories, index) => openViewStoryModal(categoryStories, index)} />
                    ))
                ) : (
                    getStoryByCategory(category).map((story, index) => (
                        <Story key={index} story={story} onClick={(categoryStories, index) => openViewStoryModal(categoryStories, index)} />
                    ))
                )}

            </div>

        </div>
    )
}

export default StoryWrapper