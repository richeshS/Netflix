import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggesions = () => {

  const {movieResults, movieNames}  = useSelector(store=>store.gpt);
  
  if(!movieNames) return null; 

  //{movieNames.map((movieName,index) =><MovieList key={movieName} title={movieName} movies={movieResults[index]} />)}
      

  return (
    <div className='p-4 m-4 bg-black bg-opacity-80 text-white'>
      <div>
      
        <MovieList title={movieNames} movies={movieResults[0]} />
      </div>
    </div>
  )
}

export default GptMovieSuggesions