import style from "./ViewStory.module.css";

function ImageContainer({imageUrl}) {
    return (
        <div className={style.viewStoryInner}>
            <div className={style.shadeTop} />
            <img src={imageUrl} alt="story" />
            <div className={style.shadeBottom} />
        </div>
    )
}

export default ImageContainer