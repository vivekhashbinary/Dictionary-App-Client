import Axios from "axios";

export const GET_ALL_WORDS = 'Get all words'
export const GET_ERROR = 'Get error'
export const GET_DATA_REQUEST = 'Get Data Request'

export const increment = () => {
    return {
        type: 'INCREMENT'
    };
};

export const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

export const getwords = () => {
    return async dispatch => {
        dispatch({
            type: 'GET_DATA_REQUEST'
        })
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = "http://localhost:8000/dictionary/allwords"
            const res = await Axios.get(url);
            console.log("INSIDE WORDS");
            // console.log(res.data);
            dispatch({
                type: 'GET_ALL_WORDS',
                payload: res
            });
        } catch(err) {
            console.log("ERROR:", err);
            dispatch({
                type: 'GET_ERROR',
                payload: ''
            });
        }
    }

}