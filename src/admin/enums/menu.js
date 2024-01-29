const Menu = Object.freeze({
    Dashboard: "Dashboard",
    Customers: "Customers",
    ProductList: "Product List",
    AddProduct: "Add Product",
    OrderManagement: "Order Management",
    ManageAdmins: "Manage Admins",
    AdminRoles: "Admin Roles",
    Categories: "Categories",
});

export const formattedMenuName = (menuName) => {
    if (!menuName) return ''; // Return an empty string if menuName is undefined or null
    return menuName.replace(/\s+/g, '').toLowerCase();
};

export const isValidPage = (pageName) => {
    if (!pageName) return false; // Return false if pageName is undefined or null
    const formattedPageName = formattedMenuName(pageName);
    return Object.values(Menu).some(menuName => formattedMenuName(menuName) === formattedPageName);
};

export const getMenuValue = (pageName) => {
    if (!pageName) return null; // Return null if pageName is undefined or null
    const formattedPageName = formattedMenuName(pageName);

    // Find the corresponding enum value
    const enumValue = Object.entries(Menu).find(([key, value]) =>
        formattedMenuName(value) === formattedPageName
    );

    return enumValue ? enumValue[1] : null;
};

export default Menu;
