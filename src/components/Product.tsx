import { useEffect, useState } from "react";
import { Card, Carousel, Col, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { apiService, ArtItem } from "../utilities/apiService";

export function Product() {
    let { id } = useParams();
    const [productData, setproductData] = useState<ArtItem[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [render, setRender] = useState(false);

    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useShoppingCart();
    const quantity = id == undefined ? 0 : getItemQuantity(parseInt(id));

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        if (id !== undefined) {
            apiService
                .getItemById(parseInt(id))
                .then((res) => {
                    setproductData([res]);
                    setRender(true);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleSelect = (
        selectedIndex: number,
        _e: Record<string, unknown> | null
    ) => {
        setSelectedImageIndex(selectedIndex);
    };

    if (!render) return <></>;

    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Carousel
                                activeIndex={selectedImageIndex}
                                onSelect={handleSelect}
                            >
                                {productData[0].imageLinks.map(
                                    (link, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block"
                                                style={{
                                                    width: "100%",
                                                    height: "800px",
                                                    objectFit: "cover",
                                                }}
                                                src={link.link}
                                            />
                                        </Carousel.Item>
                                    )
                                )}
                            </Carousel>
                        </Col>
                        <Col>
                            <Card.Title>
                                <h1>{productData[0].name}</h1>
                            </Card.Title>
                            <Card.Text className="h-75">
                                {productData[0].description}
                            </Card.Text>
                            {quantity === 0 ? (
                                <Button
                                    className="w-100"
                                    onClick={() =>
                                        increaseCartQuantity(productData[0].id)
                                    }
                                >
                                    + Add to Cart
                                </Button>
                            ) : (
                                <div
                                    className="d-flex align-items-center flex-column"
                                    style={{ gap: ".5rem" }}
                                >
                                    <div
                                        className="d-flex align-items-center justify-content-center"
                                        style={{ gap: ".5rem" }}
                                    >
                                        <Button
                                            onClick={() =>
                                                decreaseCartQuantity(
                                                    productData[0].id
                                                )
                                            }
                                        >
                                            -
                                        </Button>
                                        <span className="fs-3">{quantity}</span>{" "}
                                        in cart
                                        <Button
                                            onClick={() =>
                                                increaseCartQuantity(
                                                    productData[0].id
                                                )
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            removeFromCart(productData[0].id)
                                        }
                                        variant="danger"
                                        size="sm"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}
