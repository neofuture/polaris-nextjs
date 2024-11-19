import Link from "next/link";

export default function Sidebar() {
    return (
        <aside>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            <i className={"fad fa-home"}/> Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard">
                            <i className={"fad fa-dashboard"}/> Dashboard
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}