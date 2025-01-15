import { useState } from "react";

function MoviesList() {
    const [movies, setMovies] = useState([{
        id: 1, title: 'The Matrix', genre: 'action', description: 'Keanu Reeves dodges bullets'
    }, {
        id: 2, title: 'Hanna', genre: 'action', description: 'Teenage assassin learns about life'
    }, {
        id: 3, title: 'Arsenic and Old Lace', genre: 'comedy', description: "Old women kill people but it's funny"
    }]);

    const [showAction, setShowAction] = useState(false)
    const [showComedy, setShowComedy] = useState(false)
    
    const [showDescription, setShowDescription] = useState({})
    
    function toggleDescription(id) {
        setShowDescription((prevState) => ({
            ...prevState, 
            [id]: !prevState[id]
        }))
    }
    
    function removeMovie(id) {
        setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== id));
        setShowDescription((prevState) => {
            const { [id]: _, ...newState } = prevState;
            return newState;
        });
    }
    
    function showAllMovies() {
        setShowComedy(false);
        setShowAction(false);
    }
    
    function showActionMovies() {
        setShowAction(true);
        setShowComedy(false);
    }

    function showComedyMovies() {
        setShowAction(false);
        setShowComedy(true);
    }

    const filterMovies = showAction ? movies.filter(movie => movie.genre == "action") :
    showComedy ? movies.filter(movie => movie.genre == "comedy") : movies

    return (
        <div class="moviesList">
        <h1>Movies List</h1>
        <button onClick={showAllMovies}>Show all movies</button>
        <button onClick={showActionMovies}>Show action movies</button>
        <button onClick={showComedyMovies}>Show comedy movies</button>
        <ul>
            {
                filterMovies.map((movie, index) => (
                    <li key={index}>
                        <button onClick={() => toggleDescription(movie.id)}><h5>{movie.title}</h5></button>
                        <button onClick={() => removeMovie(movie.id)}>Remove</button>
                        {showDescription[movie.id] && <div><p>Genre: {movie.genre}</p><p>{movie.description}</p></div>}
                    </li>
                ))
            }
        </ul>
        </div>
    )

}
export default MoviesList;