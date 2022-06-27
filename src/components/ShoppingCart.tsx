import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import { apiService, ArtItem } from "../utilities/apiService";
import { useEffect, useState } from "react";

type ShoppingCartProps = {
    isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart();
    const [storeItems, setStoreItems] = useState<ArtItem[]>([]);

    useEffect(() => {
        async function getItems() {
            const response = await apiService.getAllItems();
            setStoreItems(response);
        }
        getItems();
    }, []);
    return (
        <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = storeItems.find(
                                    (i) => i.id === cartItem.id
                                );
                                return (
                                    total +
                                    (item?.prize || 0) * cartItem.quantity
                                );
                            }, 0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
