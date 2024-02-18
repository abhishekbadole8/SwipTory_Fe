import style from "./Filter.module.css"
import filterbgimg from "../../assets/filter-bg.svg"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"
import useAuthStore from "../../services/authStore"

function Filter({ handleSelectedCategory, selectedCategory,categories }) {

    // const { categories } = useAuthStore()

    return (
        <div className={style.filter}>

            <div className={style.filterTag} onClick={() => handleSelectedCategory('')}>
                <img src={filterbgimg} alt="bg-img" className={`${selectedCategory === "" && style.filterTagActive}`} />
                <h2>All</h2>
            </div>

            {categories.map((category, index) => {
                return (
                    <div className={style.filterTag} key={index} onClick={() => handleSelectedCategory(category)}>
                        <img src={filterbgimg} alt="bg-img" className={`${selectedCategory === category && style.filterTagActive}`} />
                        <h2>{category[0].toUpperCase() + category.slice(1)}</h2>
                    </div>
                )
            })}

        </div >
    )
}

export default Filter;