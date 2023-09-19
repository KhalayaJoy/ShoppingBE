import Container from "@mui/material/Container";
import { StoreItem } from "../components/StoreItem";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import axios from "axios";

interface StoreItemData {
  id: number;
  productCode: string;
  productName: string;
  unitPrice: number;
  imgUrl: string;
  stock: number;
}

export function Store() {
  const { setCasrtAll, setStockFirst, isNewData, SetNewData } =
    useShoppingCart();
  const [Data, setData] = useState<StoreItemData[]>([]);
  const fetchData = async () => {
    const result = await axios.get(
      "https://localhost:7045/api/Product/GetProduct"
    );
    console.log("result", result);
    setCasrtAll([]);
    setData(result.data);
    setStockFirst(result.data); 
    SetNewData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isNewData) {
      fetchData();
    }
  }, [isNewData]);

  return (
    <>
      <Container style={{ marginTop: "35px", width: "100%" }}>
        <Grid container spacing={-1}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Data.map((item: any) => (
                <StoreItem {...item} key={item.id} />
              ))}
            </Grid>
          </Box>
        </Grid>
      </Container>
    </>
  );
}
