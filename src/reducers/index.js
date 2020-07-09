import { combineReducers } from 'redux'
import * as types from '../constants'
import { addHours } from 'date-fns'

// INITIAL STATE
const initialTimerState = {
  checkout: addHours(Date.now(), 6),
  checkin: addHours(Date.now(), 2),
  placeInfo: {}
}

// APP REDUCER
const reservationReducer = (state = initialTimerState, { type, payload }) => {
  switch (type) {
    case types.ADD_CHECKIN:
      return {
        ...state,
        checkin: payload.checkinDate
      }
    case types.ADD_CHECKOUT:
      return {
        ...state,
        checkout:  payload.checkoutDate
      }
    case types.ADD_PLACE_INFO:
      return {
        ...state,
        placeInfo: {
          reservationCheckin: state.checkin,
          reservationCheckout: state.checkout,
          ...payload.selectedPlace
        }
      }
    default:
      return state
  }
}

// COMBINED REDUCERS
const index = {
  reservation: reservationReducer
}

export default combineReducers(index)
