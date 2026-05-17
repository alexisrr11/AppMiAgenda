import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  value: string;
  placeholder: string;
  autoComplete?: string;
  error?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  autoComplete,
  error,
  onChange,
}: FormFieldProps) => {
  const errorId = `${name}-error`;

  return (
    <label className="form-field" htmlFor={name}>
      <span>{label}</span>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
      />
      {error ? (
        <small id={errorId} className="field-error">
          {error}
        </small>
      ) : null}
    </label>
  );
};

export default FormField;
