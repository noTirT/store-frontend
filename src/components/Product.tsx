import { useEffect, useState } from "react";
import { Card, Carousel, Col, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { apiService, ArtItem } from "../utilities/apiService";

export function Product() {
    let { id } = useParams();
    const [productData, setProductData] = useState<ArtItem>({
        id: parseInt(id === undefined ? "-1" : id),
        name: "",
        prize: 0,
        imagelinks: [""],
        description: "",
        category: "",
    });
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useShoppingCart();
    const quantity = getItemQuantity(productData.id);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        if (id !== undefined) {
            apiService
                .getItemById(parseInt(id))
                .then((res) => {
                    setProductData(res);
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
                                {productData.imagelinks.map((link) => (
                                    <Carousel.Item>
                                        <img
                                            className="d-block"
                                            style={{
                                                width: "100%",
                                                height: "800px",
                                                objectFit: "cover",
                                            }}
                                            src={link}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>
                        <Col>
                            <Card.Title>
                                <h1>{productData.name}</h1>
                            </Card.Title>
                            <Card.Text className="h-75">
                                {productData.description}
                            </Card.Text>
                            {quantity === 0 ? (
                                <Button
                                    className="w-100"
                                    onClick={() =>
                                        increaseCartQuantity(productData.id)
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
                                                    productData.id
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
                                                    productData.id
                                                )
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            removeFromCart(productData.id)
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
