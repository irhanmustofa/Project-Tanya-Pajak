const initialState = {
  data: [],
  success: false,
  loading: true,
  error: null,
};

const actionReducer = {
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  RESET: "RESET",
};

const appReducer = (state, action) => {
  switch (action.type) {
    case actionReducer.SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true,
      };

    case actionReducer.FAILURE:
      return { ...state, loading: false, error: action.payload };

    case actionReducer.RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const useAppReducer = () => {
  return { appReducer, actionReducer, initialState };
};
