import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { apiService, ArtItem } from "../utilities/apiService";

export function Store() {
    const [storeItems, setStoreItems] = useState<ArtItem[]>([]);
    const [render, setRender] = useState<Boolean>(false);

    useEffect(() => {
        async function getItems() {
            const response = await apiService.getAllItems();
            setStoreItems(response);
        }
        getItems();
    }, []);

    useEffect(() => {
        setRender(true);
    }, [storeItems]);

    return (
        <>
            <h1>Store</h1>
            {!render ? null : (
                <Row md={2} xs={1} lg={3} className="g-3">
                    {storeItems.map((item) => (
                        <Col key={item["id"]}>
                            <StoreItem {...item} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}
