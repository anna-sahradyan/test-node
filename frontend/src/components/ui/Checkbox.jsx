import React from 'react';
import style from './checkbox.module.scss';

 export const Checkbox = React.forwardRef(({ checked = false, onChange, children, name, disabled }, ref) => {
    return (
        <label className={style.checkLabel}>
            <input
                type="checkbox"
                className={style.checkbox}
                checked={checked}
                onChange={onChange}
                name={name}
                disabled={disabled}
                ref={ref}
            />
            {children}
        </label>
    );
});

Checkbox.displayName = "Checkbox";


