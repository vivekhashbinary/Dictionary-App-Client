import { act } from 'react-dom/test-utils'
import { GET_ALL_WORDS, GET_ERROR, GET_DATA_REQUEST } from '../actions/index'

const initialState = {
    data: [],
    loading: false,
    errors: 'NOERROR'
}

const getAllWordsReducer = (state = initialState, action) => {
    console.log("Payload", action.payload)
    if(action.payload) {
        state = {
            data: action.payload,
            loading: false,
            error: ''
        }
    }
    switch(action.type) {
        case GET_DATA_REQUEST:
            return {
                ...state,
                data: [],
                loading: true,
                error: ''
            }
        case GET_ALL_WORDS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: ''
            }
        case GET_ERROR:
            return {
                ...state,
                data: [],
                loading: false,
                error: 'ERROR IN FETCHING'
            }
        default:
            // console.log("IN am in here")
            return {
                ...state
            }
    }

}
export default getAllWordsReducer;