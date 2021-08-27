import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from 'react-router-dom';
import {RootStateType} from "../main/bll/store";
import {JockType, removeAllJokesAC, removeJokeAC} from "../main/bll/reducer";

const ListJokes = () => {
    const favoriteJoke = useSelector<RootStateType, Array<JockType>>(state => state.chuck.favoriteJoke)
    const dispatch = useDispatch()

    const removeJoke = (id: string) => dispatch(removeJokeAC(id))



    return (
        <div>
            <NavLink to={'/'}>
                <button>back to jokes</button>
            </NavLink>
            <button onClick={() => {dispatch(removeAllJokesAC())}}>clear jokes</button>
            <div className='list_jokes'>
                <div>{favoriteJoke.map(joke =>
                    <div className='list_jokes_item' key={joke.id}>
                        -{joke.joke}
                        <button onClick={ () => removeJoke(joke.id) }>delete joke</button>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default ListJokes;