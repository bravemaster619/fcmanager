import validatejs from "validate.js";

import { validationDictionary } from './dictionary';

export default function validate(fieldName, value) {
    
    var formValues = {}
    formValues[fieldName] = value
  
    var formFields = {}
    formFields[fieldName] = validationDictionary[fieldName]
  

    const result = validatejs(formValues, formFields)
  
    if (result) {
      
      return result[field][0]
    }
  
    return null
  }
