interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

async function TheLabSlug({ params }: PageProps) {
    const { slug } = await params;

    return (
        <div>
            <h1><i className={'fad fa-flask'} /> The Lab</h1>
            <h2>Welcome to the lab</h2>
            <p>Slug: {slug}</p>
        </div>
    );
}

export default TheLabSlug;