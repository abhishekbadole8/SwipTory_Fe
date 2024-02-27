import { useEffect, useState } from "react";
import Filter from "../../components/Filter/Filter";
import style from "./Homepage.module.css"
import useStoryStore from "../../store/storyStore";
import useAuthStore from "../../store/authStore";
import StoryWrapper from "../../components/StoryWrapper/StoryWrapper";

function Homepage() {

    const { getStories, categories, getUserStories } = useStoryStore(); // story store

    const { authToken, setUserFromToken } = useAuthStore() //  auth store

    const [selectedCategory, setSelectedCategory] = useState("");

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

            {getUserStories().length > 0 &&
                <StoryWrapper storyTitle={'Your Stories'} />}

            {selectedCategory === "" ?
                (categories.map((category, index) => (<StoryWrapper key={index} category={category} />))) :
                (categories
                    .filter(category => category === selectedCategory)
                    .map((category, index) => (<StoryWrapper key={index} category={category} />)))}
        </div >
    )
}
export default Homepage;