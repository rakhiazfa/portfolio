import React, { useEffect } from "react";

const Layout = ({ children, title, className }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return <div className={className}>{children}</div>;
};

export default Layout;
