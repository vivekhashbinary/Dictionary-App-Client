import Axios from "axios";

export const GET_ALL_WORDS = 'Get all words'
export const GET_ERROR = 'Get error'
export const GET_DATA_REQUEST = 'Get Data Request'

export const getwords = () => {
    return async dispatch => {
        dispatch({
            type: 'GET_DATA_REQUEST'
        })
        try {
            const url = "https://dictionaryapp-api.herokuapp.com/dictionary/allwords"
            const res = await Axios.get(url);
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