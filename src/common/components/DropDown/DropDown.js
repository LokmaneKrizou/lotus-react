import styles from './DropDown.module.css';
import {useSelector} from "react-redux";

const CustomDropdown = ({
                            label,
                            labelText,
                            options,
                            onChange,
                            defaultValue,
                            required = true,
                            className
                        }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';
    return (
        <div className={`${styles.dropdownContainer} ${className} ${rtlStyles}`}>
            <label className={styles.dropdownLabel}>{label} {required ? "*" : null}</label>
            <div className={styles.dropdownWrapper}>
                <select className={styles.dropdown} onChange={handleChange}
                        defaultValue={defaultValue ? defaultValue : 'label'}>
                    <option value="label" disabled={!labelText}>
                        {labelText ? labelText : `Select ${label}`}
                    </option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <span className={isRtl ? styles.chevronRtl : styles.chevron}></span>
            </div>
        </div>
    );
};

export default CustomDropdown;
