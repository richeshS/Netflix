import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { Logo, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    const handleSignOut = () => { 
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
            navigate("/error");
          });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const {uid, email, displayName, photoURL} = user;
              dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
              navigate("/browse");
            } else {
              // User is signed out
              // ...
              dispatch(removeUser());
              navigate("/");
            }
          });

          return () => unsubscribe();
    },[]);

    const handleGptSearchClick = () => {
      dispatch(toggleGptSearchView());
    };

    const handleLanguageChange = (e) => {
      console.log(e.target.value);
      // dispatch(changeLanguage(e.target.value));
      dispatch(changeLanguage(e.target.value));
    };


    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
            <img className="w-44 mx-auto md:mx-0" src={Logo} alt="logo" />
            {user && <div className="flex p-2">
            
              {showGptSearch && <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
                {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} vlaue={lang.identifier}>{lang.name}</option>)}
              </select>}
              
              <button className="py-2 px-4 m-2 text-lg text-purple-500"
              onClick={handleGptSearchClick}
              >
                {showGptSearch? "Home" : "Search"}  
                </button>
            <img className="w-12 h-12" alt="userIcon" src={user?.photoURL} />
                <button onClick={handleSignOut} className="font-bold text-white"> Sign Out</button>
            </div>}
        </div>
        
    );
};

export default Header;