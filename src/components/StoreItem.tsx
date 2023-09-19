import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Box, Button } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../common/system";

type StoreItemProps = {
  id: number;
  productCode: string;
  productName: string;
  unitPrice: number;
  imgUrl: string;
  stock: number;
};
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export function StoreItem({ id,productCode, productName, unitPrice, stock }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    getStockItem,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  const stockallitem = getStockItem(id);

  return (
    <Grid item xs={12} sm={12} md={4} key={productCode}>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <ButtonBase>
              <Img alt="complex" src={"/imgs/Shop.jpg"} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" component="div">
                  {productName}
                </Typography>
                <Typography variant="body2">
                  รหัสสินค้า: {productCode}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  จำนวนคงเหลือ: {stock}
                </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                {formatCurrency(unitPrice)}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {quantity === 0 ? (
              <Grid item xs={12} textAlign={"center"}>
                <Button
                  variant="contained"
                  onClick={() => increaseCartQuantity(id)}
                  disabled={stockallitem === 0}
                >
                  + Add To Cart
                </Button>
              </Grid>
            ) : (
              <>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Box sx={{ "& button": { m: 1 } }}>
                    <div>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => decreaseCartQuantity(id)}
                      >
                        -
                      </Button>
                      <span>{quantity}</span> in cart{" "}
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => increaseCartQuantity(id)}
                        disabled={stockallitem === 0}
                      >
                        +
                      </Button>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} textAlign={"center"}>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => removeFromCart(id)}
                  >
                    Remove
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
