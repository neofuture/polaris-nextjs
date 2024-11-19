import Link from "next/link";

export default function TopNavigation() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link href="/user/profile">Profile</Link></li>
                </ul>
            </nav>
        </header>
    );
}