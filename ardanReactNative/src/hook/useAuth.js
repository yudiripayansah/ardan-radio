import React, {useReducer, useMemo, useEffect} from 'react'
import Store from '../config/Store'
const createAction = (type, payload) => {
    return {
        type, payload
    }
}
export function useAuth() {
    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'SET_USER':
                    return {
                        ...state,
                        user: {...action.payload}
                    }
                    break;
                case 'REMOVE_USER': 
                    return {
                        ...state,
                        user: undefined
                    }
                    break;
                default:
                    return state
                    break;
            }
        },
        {
            user: undefined
        }
    )
    const auth = useMemo(
        () => ({
            setUser: async (user) => {
                Store.set('ARDANUSER',user)
                dispatch(createAction('SET_USER', user))
            },
            removeUser: async () => {
                Store.remove('ARDANUSER')
                dispatch(createAction('REMOVE_USER'))
            }
        })
    )
    const checkUser = async () => {
        let user = await Store.get('ARDANUSER')
        if(user){
            dispatch(createAction('SET_USER', user))
        }
    }
    useEffect(() => {
        checkUser()
    },[])
    return {auth, state}
}