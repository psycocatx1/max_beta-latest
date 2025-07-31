'use client';

import { UseFormRegister, FieldErrors, Path, RegisterOptions, FieldValues } from 'react-hook-form';
import styles from './FormInput.module.scss';

type ValidationRules<T extends FieldValues> = Omit<RegisterOptions<T>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;

interface FormInputProps<T extends FieldValues> {
  id: Path<T>;
  type: string;
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder: string;
  validation?: ValidationRules<T>;
}

export const FormInput = <T extends FieldValues>({
  id,
  type,
  label,
  placeholder,
  register,
  errors,
  validation
}: FormInputProps<T>) => {
  const error = errors[id];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className={styles.form_field}>
      <label
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`${styles.input} ${error ? styles.input_error : ''}`}
        {...register(id, validation)}
        placeholder={placeholder}
      />
      {errorMessage && (
        <span
          className={styles.error_message}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};
