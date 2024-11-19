"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function TopNavigation() {
    const { isLoggedIn } = useAuth();

    return (
        <header>
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