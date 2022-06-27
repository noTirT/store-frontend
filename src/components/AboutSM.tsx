import { Card, CardImg } from "react-bootstrap";

type AboutSMProps = {
    imgUrl: string;
    linkUrl: string;
};

export function AboutSM({ imgUrl, linkUrl }: AboutSMProps) {
    return (
        <>
            <a href={linkUrl}>
                <img
                    src={imgUrl}
                    style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                    }}
                />
            </a>
        </>
    );
}
