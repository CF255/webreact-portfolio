
function ListOfMovies  ({movies}) {
    return (
      <ul className="movies">
         {
          movies.map(movie =>(
            <li className="movie" key={movie.id}>
              <img src={movie.poster} alt={movie.title} />
              <p>{movie.year}</p>
             <div className="divinfomovie">
             <h3>{movie.title}</h3>
             </div>
              
            </li>
          ))
         }
        </ul>
    )
  }

   function NoMoviesResults () {
    return(
      <p>sin resultados de peliculas</p>
    )
  }


  export function Movies({movies}){

    const hasMovie = movies?.length >0

    return(
            hasMovie
            ?<ListOfMovies movies={movies}/>
            :<NoMoviesResults/>
    )
  }