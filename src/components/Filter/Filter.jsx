import style from "./Filter.module.css"
import filterbgimg from "../../assets/filter-bg.svg"

function Filter({ uniqueCategory, handleSelectedCategory, selectedCategory }) {

    return (
        <div className={style.filter}>

            <div className={style.filterTag} onClick={() => handleSelectedCategory('')}>
                <img src={filterbgimg} alt="bg-img" className={`${selectedCategory === "" && style.filterTagActive}`} />
                <h2>All</h2>
            </div>

            {uniqueCategory.map((category, index) => {
                return (
                    <div className={style.filterTag} key={index} onClick={() => handleSelectedCategory(category)}>
                        <img src={filterbgimg} alt="bg-img" className={`${selectedCategory === category && style.filterTagActive}`} />
                        <h2>{category[0].toUpperCase() + category.slice(1)}</h2>
                    </div>)
            })}

        </div >
    )
}

export default Filter;