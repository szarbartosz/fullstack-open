const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'APPLY_FILTER':
      return action.filter
    default:
      return state
  }
}

export const applyFilter = (filter) => {
  return {
    type: 'APPLY_FILTER',
    filter: filter
  }
}

export default filterReducer