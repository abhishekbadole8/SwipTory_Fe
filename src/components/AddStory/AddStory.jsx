import { useContext, useState } from "react";
import style from "./AddStory.module.css";
import { UserContext } from "../../App";
import axios from "axios";

function AddStory() {

    const { addStoryModal, setAddStoryModal, addStoryInputValue, setAddStoryInputValue, BASE_STORY_URL, headers, decode, isEdit, setIsEdit, isLoading, setIsLoading } = useContext(UserContext)

    const [currentSlide, setCurrentSlide] = useState(1)
    const [error, setError] = useState('')

    const handleAddStoryInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        if (fieldName === 'images') {
            const updatedImages = [...addStoryInputValue.images];
            updatedImages[currentSlide - 1] = fieldValue; // Update image URL for the current slide
            setAddStoryInputValue((prevValue) => ({
                ...prevValue,
                images: updatedImages,
            }));
        } else {
            setAddStoryInputValue((prevValue) => ({
                ...prevValue,
                [fieldName]: fieldValue,
            }));
        }
    }

    const handleAddMoreClick = () => {
        if (addStoryInputValue.images[currentSlide - 1]) {
            if (currentSlide < 6) {
                setAddStoryInputValue((prevValue) => {
                    const updatedImages = [...prevValue.images];
                    updatedImages[currentSlide] = ""
                    return {
                        ...prevValue,
                        images: updatedImages,
                    };
                });
                setCurrentSlide((prevSlide) => prevSlide + 1);
            }
        }
    }

    const handlePreviousClick = () => {
        if (currentSlide > 1) {
            setCurrentSlide(prevSlide => prevSlide - 1)
        }
    }

    const handleError = () => {
        if (!addStoryInputValue.heading) {
            return "Please add heading"
        } else if (!addStoryInputValue.description) {
            return "Please add description"
        } else if (!addStoryInputValue.category) {
            return "Please select category"
        } else if (addStoryInputValue.images.length < 3 || addStoryInputValue.images.length > 6) {
            return "There should be minimun 3 slides, and maximum 6"
        }
        return ""
    }

    const fetchAddStory = async () => {
        try {
            let response;
            if (isEdit === false) {
                response = await axios.post(BASE_STORY_URL + '/add', {
                    userId: decode.user._id,
                    ...addStoryInputValue,
                }, headers)
            }
            if (isEdit === true) {
                response = await axios.patch(BASE_STORY_URL + '/edit/' + decode?.user?._id + '/' + addStoryInputValue.storyId, {
                    category: addStoryInputValue.category,
                    description: addStoryInputValue.description,
                    heading: addStoryInputValue.heading,
                    images: [...addStoryInputValue.images],
                    action: "updateInfoAndImage"
                }, headers)
            }
            if (response) {
                setAddStoryInputValue('')
                setAddStoryModal(!addStoryModal)
                setIsEdit(false)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            if (error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            } else {
                setError("An error occurred during Story add. Please try again.");
                console.log("Error In Add Story:", error);
            }
        }
    }

    const handleAddStorySubmit = async (e) => {
        e.preventDefault()
        let error_msg = handleError()

        if (error_msg) {
            setError(error_msg)
        } else {
            setIsLoading(true)
            setError(""); // Clear any previous error message
            await fetchAddStory()
        }
    }

    return (
        <div className={style.addStoryContainer}>
            <h3 className={style.addStoryTitle}>Add story to feed</h3>

            <div className={style.addStoryContainerInner}>

                <div className={style.slideWrapper}>

                    {addStoryInputValue.images?.length === 0 && (
                        <div className={`${style.slide} ${currentSlide === 1 && style.slideActive}`} >
                            <h4>Slide 1</h4>
                        </div>
                    )}

                    {addStoryInputValue.images?.map((imageUrl, index) => (
                        <div key={index} className={`${style.slide} ${currentSlide - 1 === index && style.slideActive}`} onClick={() => setCurrentSlide(index + 1)}>
                            <h4>Slide {index + 1}</h4>
                        </div>
                    ))}

                    {addStoryInputValue.images?.length < 6 && (
                        <div className={style.slide} onClick={handleAddMoreClick}>
                            <h4>Add more..</h4>
                        </div>
                    )}

                </div>

                <form className={style.addStoryForm} onSubmit={handleAddStorySubmit}>

                    <div className={style.heading}>
                        <label htmlFor="heading">Heading :</label>
                        <input type="text" placeholder="Your heading" name="heading" value={addStoryInputValue.heading} onChange={handleAddStoryInput} />
                    </div>

                    <div className={style.description}>
                        <label htmlFor="description">Description :</label>
                        <input type="text" placeholder="Story Description" name="description" value={addStoryInputValue.description} onChange={handleAddStoryInput} />
                    </div>

                    <div className={style.image} >
                        <label htmlFor="image">Image :</label>
                        <input type="text" placeholder="Add Image Url" name="images" value={addStoryInputValue?.images[currentSlide - 1] || ""} onChange={handleAddStoryInput} />
                    </div>

                    <div className={style.category}>
                        <label htmlFor="category">Category :</label>

                        <select name="category" onChange={handleAddStoryInput}>
                            <option>Select Category</option>
                            <option value="food" >Food</option>
                            <option value="music">Music</option>
                            <option value="nature">Nature</option>
                            <option value="car">Car</option>
                            <option value="flowers">Flower</option>
                            <option value="anime">Anime</option>
                            <option value="catroon">Cartoon</option>
                        </select>
                    </div>

                    {error && <p className={style.errorTag}>{error}</p>}

                    <button type="submit" className={`${style.authSubmitBtn} ${isLoading && style.authSubmitBtnDisable}`} disabled={isLoading}>
                        {isLoading ? <p className={style.loadingSpinner}></p> : "Post"}</button>
                </form>

                <div className={style.prevnext}>
                    <button className={style.previousBtn} onClick={handlePreviousClick}>Previous</button>

                    {currentSlide >= 6 ?
                        <button className={style.nextBtnDisabled} disabled >Next</button> :
                        <button className={style.nextBtn} onClick={handleAddMoreClick} >Next</button>
                    }
                </div>
            </div>

            <div className={style.closebtn}>
                <input type="button" value="X" onClick={() => {
                    setAddStoryModal(!addStoryModal)
                    setIsEdit(false)
                    setAddStoryInputValue({
                        heading: '',
                        description: '',
                        category: '',
                        images: [''], // Set the first image URL as an empty string
                    });
                }} />

                {addStoryInputValue.images.length < 6 &&
                    <p className={style.noteTitle}>Add upto 6 slides</p>
                }
            </div>

        </div>
    )
}

export default AddStory;