import {useParams} from "react-router-dom";
import {isValidPage} from "../enums/menu";
import AdminPage from "./AdminPage";
import NotFoundPage from "../../common/pages/NotFoundPage/NotFoundPage";

const AdminPageRouteHandler = () => {
    const {pageName} = useParams();

    if (isValidPage(pageName)) {
        return <AdminPage/>;
    } else {
        // Redirect to error page or render a 'NotFound' component
        return <NotFoundPage/>;
    }
};
export default AdminPageRouteHandler;