import { USER_AVATAR } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
    return (
        <>
            <div className="fixed -z-10">
                <img  src={USER_AVATAR}
                    alt='logo'/>
            </div>
            <div className="pt-[30%] md:p-0">
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
        </>
        
    );
};

export default GptSearch;