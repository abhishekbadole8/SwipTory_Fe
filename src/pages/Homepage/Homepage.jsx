import Filter from "../../components/Filter/Filter";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import TopStory from "../../components/TopStory/TopStory";
import style from "./Homepage.module.css"

function Homepage() {

    return (
        <div className={style.homepage}>

            <Filter />

            <TopStory />

            <TopStory />

        </div>
    )
}
export default Homepage;