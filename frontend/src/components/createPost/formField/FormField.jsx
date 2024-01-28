import React from 'react'
import './formField.scss'
import  star  from '../../../assets/star.png'
import { getRandomPrompt } from '../../../utils';

const FormField = ({ labelName, type, name, value, placeholder, handleChange, isSurpriseMe, handleSurpriseMe}) => {
  return (
    <div className="form-container">
      <div className="form">
        <label htmlFor={name} className="surprise-me">
          {labelName}
        </label>
        {isSurpriseMe && (
          <button onClick={handleSurpriseMe} type="button">
            Surprise me <img src={star} alt="star image" />
          </button>
        )}
      </div>

      <input 
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required />

    </div>
  );
}

export default FormField