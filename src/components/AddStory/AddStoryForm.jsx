import style from "./AddStory.module.css";

function AddStoryForm({ addStoryFormData, handleAddStoryInput, errorMsg, currentSlide, isLoading, handleSubmit}) {

    return (
        <div>
            <form className={style.addStoryForm} onSubmit={handleSubmit}>

                <div className={style.inputGroup}>
                    <label htmlFor="heading">Heading :</label>
                    <input type="text" placeholder="Your heading" name="heading" value={addStoryFormData.heading} onChange={handleAddStoryInput} />
                    {errorMsg.heading && <span className={style.errorTag}>{errorMsg.heading}</span>}
                </div>

                <div className={style.inputGroup}>
                    <label htmlFor="description">Description :</label>
                    <input type="text" placeholder="Story Description" name="description" value={addStoryFormData.description} onChange={handleAddStoryInput} />
                    {errorMsg.description && <span className={style.errorTag}>{errorMsg.description}</span>}
                </div>

                <div className={style.inputGroup} >
                    <label htmlFor="image">Image :</label>
                    <input type="text" placeholder="Add Image Url" name="images" value={addStoryFormData.images[currentSlide - 1] || ""} onChange={handleAddStoryInput} />
                    {errorMsg.images && <span className={style.errorTag}>{errorMsg.images}</span>}
                </div>

                <div className={style.inputGroup}>
                    <label htmlFor="category">Category :</label>

                    <select name="category" onChange={handleAddStoryInput}>
                        <option>Select Category</option>
                        <option value="food" >Food</option>
                        <option value="music">Music</option>
                        <option value="nature">Nature</option>
                        <option value="car">Car</option>
                        <option value="flowers">Flower</option>
                        <option value="anime">Anime</option>
                        <option value="cartoon">Cartoon</option>
                    </select>
                    {errorMsg.category && <span className={style.errorTag}>{errorMsg.category}</span>}
                </div>


                <button type="submit" className={`${style.authSubmitBtn} ${isLoading && style.authSubmitBtnDisable}`}>
                    {isLoading ? <p className={style.loadingSpinner}></p> : "Post"}</button>
            </form>
        </div>
    )
}

export default AddStoryForm