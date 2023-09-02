import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Filter from "../../components/Filter/Filter";
import Story from "../../components/Story/Story";
import style from "./Homepage.module.css"
import UserStory from "../../components/UserStory/UserStory";

function Homepage() {

    const { viewStoryModal, setViewStoryModal, token, allUserStories, setSelectedStoryCatArray, setSelectedStoryCatIndex, decode } = useContext(UserContext)

    const [selectedCategory, setSelectedCategory] = useState("");

    // Unique Category Saved here
    const uniqueCategory = [];
    allUserStories.forEach((story) => {
        if (!uniqueCategory.includes(story.category)) {
            uniqueCategory.push(story.category)
        }
    })

    const openViewStoryModal = (story, index) => {
        setSelectedStoryCatArray(story) // seting array of objects of all stories of that categpry
        setSelectedStoryCatIndex(index) // setting cat array index 
        setViewStoryModal(!viewStoryModal) // View Story Modal Open
    }

    // handle if clicked On filter 
    const handleSelectedCategory = (category) => {
        setSelectedCategory(category)
    }

    return (
        <div className={style.homepage} >

            <Filter uniqueCategory={uniqueCategory} handleSelectedCategory={handleSelectedCategory} selectedCategory={selectedCategory} />

            {/* Loading css */}
            {uniqueCategory.length == 0 &&
                <div className={style.storyheadback}>
                    <div className={style.backback} />
                    <div className={style.storyContainerBack}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div className={style.parentDivBack} />
                        ))}
                    </div>
                    <div className={style.backback} />
                </div>
            }

            <UserStory openViewStoryModal={openViewStoryModal} />

            {selectedCategory === "" ? (
                // Show all stories when selectedCategory is empty
                uniqueCategory.map((category, index) => (
                    <div className={style.storyhead} key={index}>
                        <h2 className={style.storytitle}>{`Top Stories About ${category[0].toUpperCase() + category.slice(1)}`}</h2>
                        <Story category={category} onClick={(categoryStories, ind) => openViewStoryModal(categoryStories, ind)} />
                    </div>
                ))
            ) : (
                // Show stories from the selected category
                uniqueCategory
                    .filter(category => category === selectedCategory)
                    .map((category, index) => (
                        <div className={style.storyhead} key={index}>
                            <h2 className={style.storytitle}>{`Top Stories About ${category[0].toUpperCase() + category.slice(1)}`}</h2>
                            <Story category={category} onClick={(categoryStories, ind) => openViewStoryModal(categoryStories, ind)} />
                        </div>
                    ))
            )}

        </div >
    )
}
export default Homepage;