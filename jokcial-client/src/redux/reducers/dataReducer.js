import { SET_JOKES,DELETE_JOKE,LIKE_JOKE,UNLIKE_JOKE,LOADING_DATA} from '../types'

const initialState={
    jokes:[],
    joke:{},
    loading:false
}

export default function(state=initialState,action){
    switch(action.type){
        case LOADING_DATA:
            return{
                ...state,
                loading:true
            }
        case SET_JOKES:
            return{
                ...state,
                jokes:action.payload,
                loading:false
            }
        case LIKE_JOKE:
        case UNLIKE_JOKE:
            let index=state.jokes.findIndex((joke)=>joke.jokeId===action.payloadjokeId)
            state.jokes[index] = action.payload
            return{
                ...state
            }
        case DELETE_JOKE:
            index = state.jokes.findIndex(joke=>joke.jokeId ===action.payload)
            state.jokes.splice(index,1)
            return{
                ...state
            }
            default:
                return{
                    ...state
                }
     
        }
            
}