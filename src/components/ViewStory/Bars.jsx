import React from 'react'
import style from "./ViewStory.module.css"

function Bars({ imagesCount,currentImageIndex }) {
    return (
        <div className={style.storyBar}>
            {imagesCount.map((_, i) => {
                return (
                    <div className={style.storyBarWrapper} key={i} >
                        <div className={`${style.barInner}  ${!(i < currentImageIndex + 1) ? style.barInner : style.barOuter}`} />
                    </div>)
            })}
        </div>
    )
}

export default Bars