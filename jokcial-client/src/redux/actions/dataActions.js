import {SET_JOKES,SET_JOKE,STOP_LOADING_UI,SET_ERRORS,LOADING_UI,POST_JOKE,CLEAR_ERRORS,DELETE_JOKE,LOADING_DATA,LIKE_JOKE,UNLIKE_JOKE} from '../types'
import axios from 'axios'

export const getJokes=()=>(dispatch)=>{
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

export const getRecentJokes=()=>(dispatch)=>{
    dispatch({type: LOADING_DATA})
    axios.get('/recentJokes')
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

export const postJoke=(newJoke)=>(dispatch)=>{
    dispatch({type: LOADING_UI})
    axios.post('/joke',newJoke)
    .then(res=>{
        dispatch({
            type:POST_JOKE,
            payload:res.data
        })
        dispatch({type:CLEAR_ERRORS})
    })
    .catch(err=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
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

export const clearErrors=()=>dispatch=>{
    dispatch({type:CLEAR_ERRORS})
}

export const getJoke =(jokeId)=>dispatch=>{
    dispatch({type:LOADING_UI})
    axios.get(`/joke/${jokeId}`)
    .then(res=>{
        dispatch({
            type:SET_JOKE,
            payload:res.data
        })
        dispatch({type:STOP_LOADING_UI})
    })
}