import { useShoppingCart } from "../context/ShoppingCartContext";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Button, ListItemAvatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatCurrency } from "../common/system";
import { CartItem } from "./CartItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, setCasrtAll, StockAll, LoadNewData } =
    useShoppingCart();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const response = await axios.put(
      "https://localhost:7045/api/Product/UpdateStock",
      StockAll
    );
    Swal.fire("The transaction was completed successfully.");
    setCasrtAll([]);
    navigate("/");
    LoadNewData();
    closeCart();     
    
  };

  return (
    <div>
      <Drawer anchor={"right"} open={isOpen} onClose={closeCart}>
        <Box sx={{ width: 460 }} role="presentation">
          <List>
            <ListItem>
              <ListItemText primary="Shopping Cart" />
              <ListItemAvatar onClick={closeCart} style={{ cursor: "pointer" }}>
                <Avatar>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
            </ListItem>
          </List>
          <Divider />
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <Divider />
          <div style={{ margin: "0.5rem", textAlign: "end" }}>
            <h2>
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = StockAll.find(
                    (i) => i.id === cartItem.id
                  );
                  return total + (item?.unitPrice || 0) * cartItem.quantity;
                }, 0)
              )}
            </h2>
          </div>
          <div style={{ margin: "0.5rem", textAlign: "end" }}>
            <Button variant="contained" color="success" onClick={onSubmit}>
              Check out
            </Button>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}
