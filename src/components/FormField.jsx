import React from 'react';

const FormField = ({ 
  id, 
  label, 
  type, 
  value, 
  onChange, 
  placeholder, 
  error, 
  required = true 
}) => {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-input ${error ? 'input-error' : ''}`}
        required={required}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FormField;
