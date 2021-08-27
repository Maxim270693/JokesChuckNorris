import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../main/bll/store";
import {favoriteJokeAC, getJokesTC, getJokeTC} from "../main/bll/reducer";
import {NavLink} from "react-router-dom";

let int: NodeJS.Timeout

const ChuckNorris = () => {
    const joke = useSelector<RootStateType, string | null>(state => state.chuck.joke)
    const dispatch = useDispatch()
    const [but, setBut] = useState(false)


    const setNewIntervalJoke = () => {
        int = setInterval(() => {
            dispatch(getJokesTC())
        }, 1000)
    }

    let clearIntervalJoke = () => {
        clearInterval(int)
    }

    return (
        <div>
            <div className='joke'>
                <h1>Jokes Chuck Norris</h1>
                    <NavLink to={'/listJokes'}>
                        <button>go to the list</button>
                    </NavLink>
                <button onClick={() => {
                    dispatch(getJokeTC())
                }}>new Joke
                </button>

                    {!but && <button onClick={() => {
                        setNewIntervalJoke()
                        setBut(!but)
                    }}>new Joke Timer</button>}

                    {but && <button onClick={() => {
                        clearIntervalJoke()
                        setBut(!but)
                    }}>stop new Joke Timer</button>}

                <div>{joke && <>{joke}
                    <button onClick={() => {dispatch(favoriteJokeAC(joke))}}>
                        add to joke list
                    </button>
                </>
                }</div>
            </div>
        </div>
    );
};

export default ChuckNorris;