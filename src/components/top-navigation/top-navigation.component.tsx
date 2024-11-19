"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function TopNavigation() {
    const { isLoggedIn, login, logout } = useAuth();

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/user/profile">
                            <i className="fad fa-user"/> Profile
                        </Link>
                    </li>
                </ul>
            </nav>
            <div>
                <button onClick={login}>Login</button>
                <button onClick={logout}>Logout</button>
                <p>Login state: {isLoggedIn ? "Logged In" : "Logged Out"}</p>
            </div>
        </header>
    );
}