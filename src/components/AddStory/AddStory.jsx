import { useContext, useEffect, useState } from "react";
import style from "./AddStory.module.css";
import { UserContext } from "../../App";
import Slide from "./Slide";
import AddStoryForm from "./AddStoryForm";
import validateAddStoryForm from "../../utils/validateAddStoryForm";
import useStoryStore from "../../services/storyStore";
import useAuthStore from "../../services/authStore";

function AddStory() {

    const { addStoryModal, setAddStoryModal, isEdit, setIsEdit } = useContext(UserContext)

    const { createStory } = useStoryStore()
    const { user } = useAuthStore()

    const [addStoryFormData, setAddStoryFormData] = useState({
        heading: "",
        description: "",
        category: "",
        images: []
    });
    // const [images, setImages] = useState([])

    const [currentSlide, setCurrentSlide] = useState(1)
    const [errorMsg, setErrorMsg] = useState({
        heading: "",
        description: "",
        category: "",
        images: "",
    })
    const [isLoading, setIsLoading] = useState(false)

    // handle input chnages 
    const handleAddStoryInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        if (fieldName === 'images') {
            const updatedImages = [...addStoryFormData.images];
            updatedImages[currentSlide - 1] = fieldValue; // Update image URL for the current slide
            setAddStoryFormData((prevValue) => ({
                ...prevValue,
                images: updatedImages,
            }));
        } else {
            setAddStoryFormData((prevValue) => ({
                ...prevValue,
                [fieldName]: fieldValue,
            }));
        }
        setErrorMsg((prevError) => ({ ...prevError, [fieldName]: "" }))
    }

    // handle next & add more click
    const handleAddMoreClick = () => {
        const errors = validateAddStoryForm(addStoryFormData, currentSlide)

        if (Object.keys(errors).length !== 0) {
            setErrorMsg((prevError) => ({ ...prevError, ...errors }))
            return;
        }

        if (addStoryFormData.images[currentSlide - 1]) {
            if (currentSlide < 6) {
                setAddStoryFormData((prevValue) => {
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

    // handle cancel
    const handleCancel = () => {
        setAddStoryModal(!addStoryModal)
        setIsEdit(false)
        setAddStoryFormData({
            heading: '',
            description: '',
            category: '',
            images: [''], // Set the first image URL as an empty string
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (addStoryFormData.images.length < 3) {
                setErrorMsg((prevError) => ({ ...prevError, images: 'Min 3 Images Required' }))
                return;
            } else {
                await createStory({ userId: user._id, ...addStoryFormData })
                setAddStoryModal(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={style.addStoryContainer}>
            <h3 className={style.addStoryTitle}>Add story to feed</h3>

            <div className={style.addStoryContainerInner}>

                <div className={style.slideWrapper}>

                    {addStoryFormData.images.length === 0 ?
                        <Slide value={1} currentSlide={currentSlide} />
                        :
                        addStoryFormData.images.map((_, index) => {
                            return <Slide key={index} value={index + 1} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
                        })}

                    {addStoryFormData.images.length < 6 && (
                        <div className={style.slide} onClick={handleAddMoreClick}>
                            <h4>Add more..</h4>
                        </div>)}

                </div>

                <AddStoryForm addStoryFormData={addStoryFormData}
                    setAddStoryFormData={setAddStoryFormData}
                    handleAddStoryInput={handleAddStoryInput}
                    errorMsg={errorMsg} setErrorMsg={setErrorMsg}
                    isLoading={isLoading} currentSlide={currentSlide} handleSubmit={handleSubmit} />

                <div className={style.prevnext}>
                    <button className={style.previousBtn} onClick={handlePreviousClick}>Previous</button>

                    {currentSlide >= 6 ?
                        <button className={style.nextBtnDisabled} disabled >Next</button> :
                        <button className={style.nextBtn} onClick={handleAddMoreClick} >Next</button>
                    }
                </div>
            </div>

            <div className={style.closebtn}>
                <button onClick={handleCancel} >X</button>

                {addStoryFormData.images.length < 6 &&
                    <p className={style.noteTitle}>Add upto 6 slides</p>
                }
            </div>

        </div>
    )
}

export default AddStory;