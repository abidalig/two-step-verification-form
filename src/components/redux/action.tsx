// actions.js
export const submitFormData = (formData: any) => {
    //console.log('dispat',formData);
    
    return { type: 'SUBMIT_FORM_DATA', payload: formData };
  };
  