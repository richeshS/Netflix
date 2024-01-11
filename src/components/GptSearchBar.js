import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
const GptSearchBar = () => {

  const dispatch = useDispatch();

  const langKey = useSelector(store=>store.config.lang);
  
  const searchText = useRef(null);

  //search for movie in tmdb
  const searchMovieTMDB = async(movie) =>{
      const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS)

      const json = await data.json()

      return json.results;
  };


  const handleGptSearchClick = async() =>{
    //call the openai api 
    //console.log(searchText.current.value);
    //make an API Call to gpt api and get movie results 

    // const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query: " + searchText.current.value +". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: 'user', content: gptQuery }],
    //   model: 'gpt-3.5-turbo',
    // });

    // if(!gptResults.choices){
    //   //Error 
    // }

    // const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    
    //for each movie, we'll search for TMDB 
    //const data = gptMovies.map((movie)=>(searchMovieTMDB()))
    
    const data = searchMovieTMDB(searchText.current.value);
    //this will return me a promise and not a result 
    //array of promises 
    //const tmdbResults = await Promise.all(data);
    
    const tmdbResults = await Promise.all([data]);
    console.log(tmdbResults);

    //dispatch and action into gptSlice 

    dispatch(addGptMovieResult({movieNames: searchText.current.value, movieResults: tmdbResults}));
    

  };

  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
    <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
    <input ref={searchText} type='text' className='p-4 m-4 col-span-9' 
    placeholder={lang[langKey].gptsearchPlaceholder} />
    <button onClick={handleGptSearchClick} className='col-span-3 py-2 m-4 px-4 bg-red-700 text-white rounded-lg'>
    {lang[langKey].search}
    </button>
    </form>
    </div>
  )
}

export default GptSearchBar;