import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useEffect, useState } from "react";
function HomePage() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [search, setSearch] = useState("");
  //const [searchPrice, setSearchPrice] = useState("");
  //console.log("searching value--->", search, searchPrice);

  //console.log("count--->", count);
  /*const productList = async () => {
    const response = await axios.get("https://dummyjson.com/products");
    // console.log("res---", response.data.products);
    setData(response.data.products);
  };*/
  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((response) => {
      if (response.status === 200) {
        console.log("responsesss--->", response);
        setData(response.data.products);
      }
    });
  }, []);
  const productCount = (item) => {
    setCount(count + 1);
    console.log("item-->", item);
    setPrice(item.price + price);
  };
  return (
    <Box>
      <Stack
      sx={{mt:2}}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Typography>
          Cart:-<span style={{ color: "red" }}>{count}</span>
        </Typography>
        <Typography>
          Price:-<span>Rs. {price}</span>
        </Typography>
      </Stack>

      <Box sx={{ p: 1, mt: 2 }}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <TextField
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              label="Search..."
              id="fullWidth"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={(e) => setSearch(e.target.value)}
              type="number"
              fullWidth
              label="Filter Price..."
              id="fullWidth"
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={4} sx={{ p: 1 }}>
        {data
          .filter((item) => {
            return Object.keys(item).some((key) => {
              return String(item[key])
                .toLocaleLowerCase()
                .includes(String(search.toLocaleLowerCase()));
            });
          })
          .map((item, index) => {
            // console.log("item--->", item.title, index);
            return (
              <Grid key={index} item xs={6} sm={4} md={3}>
                <Card sx={{ maxWidth: 445 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="150"
                      width="100"
                      src={item.thumbnail}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.brand}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        Rs. {item.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.title.slice(0, 80)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      onClick={() => productCount(item)}
                      size="small"
                      color="primary"
                    >
                      Add To Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
export default HomePage;
