"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function TopNavigation() {
    const { isLoggedIn, login, logout } = useAuth();

    return (
        <header>
            <div>
                <button onClick={login}>Login</button>
                <button onClick={logout}>Logout</button>
                Login state: {isLoggedIn ? "Logged In" : "Logged Out"}
            </div>
            <nav>
                <ul>
                    {isLoggedIn ? (
                        <li>
                            <Link href="/user/profile">
                                <i className="fad fa-user icon"/> Profile
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link href="/user/login">
                                <i className="fad fa-sign-in icon"/> Login
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}