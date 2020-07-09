import * as types from '../constants'

export const addCheckin = (checkinDate) => (dispatch) =>
    dispatch({ type: types.ADD_CHECKIN, payload: { checkinDate } })


export const addCheckout = (checkoutDate) => (dispatch) =>
        dispatch({ type: types.ADD_CHECKOUT, payload: { checkoutDate } })

export const addPlace = (selectedPlace) => (dispatch) =>
        dispatch({ type: types.ADD_PLACE_INFO, payload: { selectedPlace } })
