import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Filter from "../../components/Filter/Filter";
import style from "./Homepage.module.css"
import useStoryStore from "../../store/storyStore";
import useAuthStore from "../../store/authStore";
import StoryWrapper from "../../components/StoryWrapper/StoryWrapper";

function Homepage() {

    const { getStories, categories, getUserStories } = useStoryStore(); // story store

    const { user, authToken, setUserFromToken } = useAuthStore() //  auth store

    const { viewStoryModal, setViewStoryModal, setSelectedStoryCatArray, setSelectedStoryCatIndex } = useContext(UserContext)

    const [selectedCategory, setSelectedCategory] = useState("");

    const openViewStoryModal = (story, index) => {
        setSelectedStoryCatArray(story) // seting array of objects of all stories of that categpry
        setSelectedStoryCatIndex(index) // setting cat array index 
        setViewStoryModal(!viewStoryModal) // View Story Modal Open
    }

    // handle if clicked On filter 
    const handleSelectedCategory = (category) => {
        setSelectedCategory(category)
    }

    useEffect(() => {
        getStories()
        setUserFromToken(authToken)
    }, [authToken])

    return (
        <div className={style.homepage} >

            <Filter categories={categories} handleSelectedCategory={handleSelectedCategory} selectedCategory={selectedCategory} />

            {/* Loading css */}
            {categories.length == 0 &&
                <div className={style.storyheadback}>
                    <div className={style.backback} />
                    <div className={style.storyContainerBack}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div className={style.parentDivBack} key={index} />
                        ))}
                    </div>
                    <div className={style.backback} />
                </div>}

            {getUserStories().length > 0 && <StoryWrapper storyTitle={'Your Stories'} openViewStoryModal={openViewStoryModal} />}

            {selectedCategory === "" ?
                (categories.map((category, index) => (
                    <StoryWrapper key={index} category={category} openViewStoryModal={openViewStoryModal} />
                )))
                :
                (categories
                    .filter(category => category === selectedCategory)
                    .map((category, index) => (
                        <StoryWrapper key={index} category={category} onClick={(categoryStories, index) => openViewStoryModal(categoryStories, index)} />
                    )))}

        </div >
    )
}
export default Homepage;