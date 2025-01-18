const initialState = {
    loading: false,
    categories: [], // Ensure this is an array
    error: null,
    success: false,
  };
  
  export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_CATEGORIES_REQUEST':
        return { ...state, loading: true };
      case 'GET_CATEGORIES_SUCCESS':
        return { ...state, loading: false, categories: action.payload };
      case 'GET_CATEGORIES_FAILED':
        return { ...state, loading: false, error: action.payload };
      case 'ADD_CATEGORY_REQUEST':
        return { ...state, loading: true };
      case 'ADD_CATEGORY_SUCCESS':
        return { ...state, loading: false, success: true, categories: [...state.categories, action.payload] };
      case 'ADD_CATEGORY_FAILED':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };