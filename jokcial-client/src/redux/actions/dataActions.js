import {SET_JOKES, DELETE_JOKE,LOADING_DATA,LIKE_JOKE,UNLIKE_JOKE} from '../types'
import axios from 'axios'

//get all jokes
export const getJokes = ()=> dispatch=>{
    dispatch({type: LOADING_DATA})
    axios.get('/jokes')
    .then(res=>{
        dispatch({
            type:SET_JOKES,
            payload:res.data
        })
    })
    .catch(err=>{
        dispatch({
            type:SET_JOKES,
            payload:[]
        })
    })
}

export const likeJoke =(jokeId)=>dispatch=>{
    axios.get(`/joke/${jokeId}/like`)
    .then(res=>{
        dispatch({
            type:LIKE_JOKE,
            payload:res.data
        })
    })
    .catch(err=>console.log(err))
}

export const unlikeJoke =(jokeId)=>dispatch=>{
    axios.get(`/joke/${jokeId}/unlike`)
    .then(res=>{
        dispatch({
            type:UNLIKE_JOKE,
            payload:res.data
        })
    })
    .catch(err=>console.log(err))
}

export const deleteJoke = (jokeId)=>(dispatch)=>{
    axios.delete(`/joke/${jokeId}`)
    .then(()=>{
        dispatch({type:DELETE_JOKE, payload:jokeId})
    })
    .catch(err=>console.log(err))
}