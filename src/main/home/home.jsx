import React, { Component, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { increment, decrement, getwords } from '../../actions/index'

function Home() {
    const history = useHistory();
    const counter = useSelector(state => state.counterReducer);
    const dispatch = useDispatch();
    // useEffect(dispatch(getwords()))
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={() => {
                dispatch(getwords())
            }}>GET INFO</button>
            <button onClick={() => {
                history.push('/')
            }}>NAVIGATE</button>
        </div>
    );
}
export default Home;