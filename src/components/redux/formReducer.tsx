
const initialState = {
    formData: null,
  };
  
  const formReducer = (state = initialState, action: { type: any; payload: any; }) => {
    //console.log('reduc');
    
    switch (action.type) {
      case 'SUBMIT_FORM_DATA':
        return {
          ...state,
          formData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default formReducer;
  