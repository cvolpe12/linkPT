const initalState = {
  allContacts: [],
  // showOverlay: false
}

function reducer(state = initalState, action) {
  switch (action.type) {
    case 'GET_CONTACTS':
        return {...state, allContacts: action.payload}
    case 'ADD_CONTACT':
        return {...state, allContacts: [...state.allContacts, action.payload]}
    case 'REMOVE_CONTACT':
        return {...state, allContacts: action.payload}
    default:
      return state
  }
}

export default reducer;
