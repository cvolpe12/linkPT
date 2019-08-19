const initalState = {
  allContacts: []
}

function reducer(state = initalState, action) {
  switch (action.type) {
    case 'GET_CONTACTS':
        return {...state, allContacts: action.payload}
    default:
      return state
  }
}

export default reducer;
