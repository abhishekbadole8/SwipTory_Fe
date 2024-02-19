import style from "./AddStory.module.css";

function Slide({ value, currentSlide, setCurrentSlide }) {

    return (

        <div className={`${style.slide} ${currentSlide === value && style.slideActive}`} onClick={()=>setCurrentSlide(value)}>
            <h4>Slide {value}</h4>
        </div>

    )
}

export default Slide