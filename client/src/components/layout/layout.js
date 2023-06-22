import React from "react";
import Footer from "./footer";
import Headers from './header'
const Layout = (props)=>{
    return (
        <div>
            <Headers/>
            <main >
            {props.children}

            </main>

            <Footer / >
            
        </div>
    );
};
export default Layout;