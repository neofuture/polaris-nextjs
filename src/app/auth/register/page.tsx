import React from "react";
import Button from "@/components/microcomponents/button/button.component";

const Register: React.FC = () => {
    return (
        <div>
            <h1><i className='fad fa-user-plus'/> Register</h1>
            <h2>Welcome to registration</h2>
            <Button href='/auth/login' iconName='fad fa-sign-in'>Login</Button>

        </div>
    );
}

export default Register;