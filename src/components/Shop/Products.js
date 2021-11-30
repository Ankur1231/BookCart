import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PROD = [
  {
    id: "p1",
    price: 6,
    title: "My First Book",
    description: "lorem ipsum",
  },
  {
    id: "p2",
    price: 10,
    title: "My Second Book",
    description: "lorem ipsum",
  },
  {
    id: "p3",
    price: 15,
    title: "My Third Book",
    description: "lorem ipsum",
  },
  {
    id: "p4",
    price: 20,
    title: "My Forth Book",
    description: "lorem ipsum",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PROD.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
