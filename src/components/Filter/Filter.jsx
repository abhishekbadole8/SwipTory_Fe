import style from "./Filter.module.css"
import filterbgimg from "../../assets/filter-bg.svg"
import { useContext } from "react";
import { UserContext } from "../../App";

function Filter({ uniqueCategory, handleSelectedCategory, selectedCategory }) {

    return (
        <div className={style.filter}>

            <div className={`${style.filterTag} ${selectedCategory === "" && style.filterTagActive}`} onClick={() => handleSelectedCategory('')}>
                <img src={filterbgimg} alt="bg-img" />
                <h2>All</h2>
            </div>

            {uniqueCategory.map((category, index) => {
                return (
                    <div className={`${style.filterTag} ${selectedCategory === category && style.filterTagActive}`} key={index} onClick={() => handleSelectedCategory(category)}>
                        <img src={filterbgimg} alt="bg-img" />
                        <h2>{category[0].toUpperCase() + category.slice(1)}</h2>
                    </div>)
            })}

        </div >
    )
}

export default Filter;