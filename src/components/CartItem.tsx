import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { apiService, ArtItem } from "../utilities/apiService";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
    id: number;
    quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart();
    const [storeItems, setStoreItems] = useState<ArtItem[]>([]);

    useEffect(() => {
        async function getItems() {
            const response = await apiService.getAllItems();
            setStoreItems(response);
        }
        getItems();
    }, []);
    const item = storeItems.find((i) => i.id === id);
    if (item == null) return null;

    return (
        <Stack
            direction="horizontal"
            gap={2}
            className="d-flex align-items-center"
        >
            <img
                src={item.imagelinks[0]}
                style={{ width: "125px", height: "75px", objectFit: "cover" }}
            />
            <div className="me-auto">
                <div>
                    {item.name}{" "}
                    {quantity > 1 && (
                        <span
                            className="text-muted"
                            style={{ fontSize: ".65rem" }}
                        >
                            x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.prize)}
                </div>
            </div>
            <div>{formatCurrency(item.prize * quantity)}</div>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item.id)}
            >
                &times;
            </Button>
        </Stack>
    );
}
