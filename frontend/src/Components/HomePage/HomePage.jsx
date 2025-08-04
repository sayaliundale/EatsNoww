import Hero from "./Hero"
import Restaurants from "../Restaurants/Restaurants"
import Filters from "../Restaurants/Filters"

const HomePage = () =>{
    return(
        <>
            <Hero/>
            <Filters/>
            <Restaurants/>
        </>
    )
}

export default HomePage