import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown';
import { toggleRtl } from '../../redux/slices/rtlSlice';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { setSearchTerm } from '../../redux/slices/searchSlice';

const Navbar = () => {
    const searchTerm = useSelector((state) => state.search.searchTerm);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const storedSearchTerm = localStorage.getItem('searchTerm');
        if (storedSearchTerm) {
            dispatch(setSearchTerm(storedSearchTerm));
        }
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (inputSearchTerm.trim()) {
            dispatch(setSearchTerm(inputSearchTerm));
            navigate(`/search/${inputSearchTerm}`);
        }
    };

    const [inputSearchTerm, setInputSearchTerm] = useState(searchTerm);

    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';

    return (
        <nav className={`${styles.navbar} ${rtlStyles}`}>
            <div className={styles.logo}>
                <Link to="/">Lotus</Link>
            </div>
            <form className={styles.searchForm} onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder={t('navbar.searchHint')}
                    value={inputSearchTerm}
                    onChange={(e) => setInputSearchTerm(e.target.value)}
                />
                <button type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
            <div className={styles.navLinks}>
                <Link to="/signin">
                    <button>{t('navbar.signIn')}</button>
                </Link>
                <LanguageDropdown
                    isRtl={isRtl}
                    onLanguageChange={(language) =>
                        language === 'ar' ? dispatch(toggleRtl()) : dispatch(toggleRtl(false))
                    }
                />
                <button className={styles.bagBtn}>
                    <FontAwesomeIcon icon={faShoppingBag} size={"xl"}/>
                </button>
            </div>
        </nav>
    );
};
export default Navbar;