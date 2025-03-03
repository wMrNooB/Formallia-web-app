import Categories from "./Categories";
import Trending from "./Trending";
import ShopCategories from "./ShopCategories";
import FirstHomePageElement from "./FirstHomePageElement";
import SecondHomePageElement from "./SecondHomePageElement";


const Hero= () => {

    return (
    <>
    <FirstHomePageElement/>
    <SecondHomePageElement/>
    <ShopCategories/>
    <Trending />
    <Categories title={"More categories"}/>
    </>
      )
    }
export default Hero;