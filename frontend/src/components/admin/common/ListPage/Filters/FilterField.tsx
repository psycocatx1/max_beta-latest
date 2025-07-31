'use client';

import styles from './Filters.module.scss';

interface Option {
  value: string;
  label: string;
}

export interface FilterFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'select' | 'number' | 'checkbox';
  value: string;
  onChange: (name: string, value: string) => void;
  options?: Option[];
}

export const FilterField = ({
  name,
  label,
  placeholder,
  type,
  value,
  onChange,
  options = [],
}: FilterFieldProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <div className={styles.filters_field}>
      <label
        htmlFor={name}
        className={styles.filters_label}
      >
        {label}
      </label>

      {type === 'select' ? (
        <select
          id={name}
          className={styles.filters_select}
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          className={styles.filters_input}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}; 