import {Link} from 'react-router-dom';
import styles from './Navbar.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux';
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown';
import {toggleRtl} from '../../redux/slices/rtlSlice';
import { useTranslation } from 'react-i18next';

const Navbar = () => {

    const { t } = useTranslation();
    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality
    };
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const dispatch = useDispatch();

    const rtlStyles = isRtl ? styles.rtl : '';
    return (
        <nav className={`${styles.navbar} ${rtlStyles}`}>
            <div className={styles.logo}>
                <Link to="/">Lotus</Link>
            </div>
            <form className={styles.searchForm} onSubmit={handleSearch}>
                <input type="text" placeholder={t('navbar.searchHint')}/>
                <button type="submit">
                    <FontAwesomeIcon icon={faSearch}/>
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
                    <FontAwesomeIcon icon={faShoppingBag}/>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
