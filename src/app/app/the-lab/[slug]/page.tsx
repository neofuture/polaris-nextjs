import TextBuilder from "@/app/app/the-lab/text-builder/text-builder.component";
import ButtonBuilder from "@/app/app/the-lab/button-builder/button-builder.component";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

async function TheLabSlug({ params }: PageProps) {
    const { slug } = await params;

    let ComponentToRender;
    switch (slug) {
        case 'text-builder':
            ComponentToRender = TextBuilder;
            break;
        case 'button-builder':
            ComponentToRender = ButtonBuilder;
            break;
        default:
            ComponentToRender = null;
    }

    return (
        <div>
            {ComponentToRender ? (
                <ComponentToRender />
            ) : (
                <>
                    <h1><i className={'fad fa-flask'} /> The Lab</h1>
                    <h2>Welcome to the lab</h2>
                    <p>Slug: {slug}</p>
                </>
            )}
        </div>
    );
}

export default TheLabSlug;