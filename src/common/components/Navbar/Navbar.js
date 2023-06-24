import {Link, useNavigate, useLocation} from 'react-router-dom';
import styles from './Navbar.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBasketShopping, faSearch} from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch} from 'react-redux';
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown';
import {toggleRtl} from '../../redux/slices/rtlSlice';
import {useTranslation} from 'react-i18next';
import {useEffect, useState} from 'react';
import {setSearchTerm} from '../../../features/search/redux/searchSlice';
import CartBadge from '../../../features/cart/components/CartBadge/CartBadge';
import AccountDropdown from "../AccountDropdown/AccountDropdown";

const Navbar = () => {
    const searchTerm = useSelector((state) => state.search.searchTerm);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.auth.user)
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

    const regex = /search\/(.+)/;
    const searchTermFromPath = location.pathname.match(regex)?.[1] || '';

    const [inputSearchTerm, setInputSearchTerm] = useState(searchTermFromPath || searchTerm);

    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';

    return (
        <nav className={`${styles.navbar} ${rtlStyles}`}>
            <div className={styles.navbarContainer}>
                <div className={styles.logo}>
                    <Link to="/" onClick={(e) => setInputSearchTerm('')}>Lotus</Link>
                </div>
                <form className={styles.searchForm} onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder={t('navbar.searchHint')}
                        value={inputSearchTerm}
                        onChange={(e) => setInputSearchTerm(e.target.value)}
                    />
                    <button type="submit">
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </form>
                <div className={styles.navLinks}>
                    {user ? <AccountDropdown/> :
                        <Link to="/signin">
                            <button>{t('navbar.signIn')}</button>
                        </Link>
                    }

                    <LanguageDropdown
                        isRtl={isRtl}
                        onLanguageChange={(language) =>
                            language === 'ar' ? dispatch(toggleRtl()) : dispatch(toggleRtl(false))
                        }
                    />
                    <Link to="/cart">
                    <button className={styles.bagBtn}>
                        <FontAwesomeIcon icon={faBasketShopping} size={"xl"} fillOpacity={0}/>
                        <CartBadge/>
                    </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;