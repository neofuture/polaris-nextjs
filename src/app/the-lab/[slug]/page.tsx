interface PageProps {
    params: {
        slug: string;
    };
}

export default function Page({ params: { slug } }: PageProps) {
    return (
        <div>
            <h1><i className={'fad fa-flask'} /> The Lab</h1>
            <h2>Welcome to the lab</h2>
            <p>Slug: {slug}</p>
        </div>
    );
}