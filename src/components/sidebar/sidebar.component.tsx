import Link from "next/link";

export default function Sidebar() {
    return (
        <aside>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                </ul>
            </nav>
        </aside>
    );
}