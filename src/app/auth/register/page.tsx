import React from "react";
import NavLink from "@/components/microcomponents/nav-link/nav-link.component";

const Register: React.FC = () => {
    return (
        <div>
        <h1><i className='fad fa-user-plus'/> Register</h1>
            <NavLink href='/auth/login' iconName='fa-sign-in'>Login</NavLink>

        </div>
    );
}

export default Register;