import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChuckNorris from "../../components/ChuckNorris";
import ListJokes from "../../components/ListJokes";

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path={'/'} render={() => <ChuckNorris/>}/>
                <Route exact path={'/listJokes'} render={() => <ListJokes/>}/>
            </Switch>
        </div>
    );
};

export default Routes;