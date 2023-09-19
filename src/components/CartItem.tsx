import { Button, Grid, List, ListItem } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../common/system";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const {
    removeFromCart,
    StockAll,
    decreaseCartQuantity,
    increaseCartQuantity,
    getStockItem,
  } = useShoppingCart();
  const stockallitem = getStockItem(id);
  const item = StockAll.find((i) => i.id === id);
  if (item == null) return null;
  

  return (
    <>
      <List>
        <ListItem>
          <Grid container spacing={{ xs: 2 }}>
            <Grid item xs={5}>
              <div>
                {" "}
                {item.productName}
                {quantity > 0 && (
                  <span>
                    {"  x "}
                    {quantity}
                  </span>
                )}
              </div>
              <div>{formatCurrency(item.unitPrice)}</div>
            </Grid>
            <Grid item xs={7} style={{ textAlign: "end" }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <Button
                  title="Reduce item"
                  variant="outlined"
                  size="small"
                  onClick={() => decreaseCartQuantity(id)}
                >
                  <RemoveIcon />
                </Button>
                <span>{" " + quantity}</span> in cart{" "}
                <Button
                  title="Add item"
                  variant="outlined"
                  size="small"
                  onClick={() => increaseCartQuantity(id)}
                  disabled={stockallitem === 0}
                >
                  <AddIcon />
                </Button>
              </div>
              {formatCurrency(item.unitPrice * quantity)}
              <Button
                title="Remove All"
                size="small"
                color="error"
                variant="outlined"
                style={{ marginLeft: "0.5rem" }}
                onClick={() => removeFromCart(item.id)}
              >
                <CloseIcon />
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </>
  );
}
