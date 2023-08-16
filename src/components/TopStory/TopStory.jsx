import style from "./TopStory.module.css";
import food from "../../assets/Food.svg"

function TopStory() {
    return (
        <div className={style.topstory}>
            <h4>Top Stories About food</h4>

            <div className={style.storyWrapper}>

                <div className={style.story}>
                    <img src={food} alt="story" />
                    <div className={style.content}>
                        <h5>Heading comes here</h5>
                        <p>Inspirational designs, illustrations, and
                            graphic elements from the worlds best designers.</p>
                    </div>
                </div>

                <div className={style.story}>
                    <img src={food} alt="story" />
                    <div className={style.content}>
                        <h5>Heading comes here</h5>
                        <p>Inspirational designs, illustrations, and
                            graphic elements from the worlds best designers.</p>
                    </div>
                </div>
                
                <div className={style.story}>
                    <img src={food} alt="story" />
                    <div className={style.content}>
                        <h5>Heading comes here</h5>
                        <p>Inspirational designs, illustrations, and
                            graphic elements from the worlds best designers.</p>
                    </div>
                </div>



            </div>

            <button className={style.seemorebtn}>See more</button>
        </div>
    )
}

export default TopStory;