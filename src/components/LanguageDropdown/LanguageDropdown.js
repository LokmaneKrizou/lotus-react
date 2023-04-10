import React, {useState} from 'react';
import styles from './LanguageDropdown.module.css';
import englishFlag from '../../assets/images/flags/english.png';
import arabicFlag from '../../assets/images/flags/arabic.png';
import i18n from '../../translation/i18n'

const LanguageDropdown = ({isRtl, onLanguageChange}) => {
    const languages = [
        {value: 'en', flag: englishFlag},
        {value: 'ar', flag: arabicFlag},
    ];
    const [isOpen, setIsOpen] = useState(false);
    const defaultLanguage = isRtl ? languages[1] : languages[0];
    const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

    const handleChange = async (event) => {
        const language = await languages.find(lang => lang.value === event.target.alt);
        if (language.value !== defaultLanguage.value) {
            setSelectedLanguage(language);
            onLanguageChange(language.value);
            await i18n.changeLanguage(language.value);
        }
        handleToggleDropdown();
    };

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className={styles.languageDropdown}>
            <button className={styles.languageBtn} onClick={handleToggleDropdown}>
                <img src={selectedLanguage.flag} alt={selectedLanguage.value}/>
            </button>
            {isOpen && (
                <ul className={styles.languageList}>
                    <li className={styles.languageItem}>
                        <button className={styles.languageOption} onClick={e => handleChange(e)}>
                            <img src={languages[1].flag} alt={languages[1].value}/>
                        </button>
                    </li>
                    <li className={styles.languageItem}>
                        <button className={styles.languageOption} onClick={e => handleChange(e)}>
                            <img src={languages[0].flag} alt={languages[0].value}/>
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default LanguageDropdown;
