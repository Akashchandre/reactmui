import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchProducts();
        const match = res.products.find((p) => p.id === id || p.sku_code === id);
        setProduct(match);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div>Product not found.</div>;

  const {
    name = "Unnamed Product",
    mrp,
    main_category,
    description,
    images,
  } = product;

  const price = mrp?.mrp || "N/A";
  const imageUrl =
    images?.front || "https://placehold.co/200x200?text=No+Image";

  return (
    <div style={{ padding: "20px", maxWidth: 800, margin: "auto" }}>
      <h2>{name}</h2>
      <img
        src={imageUrl}
        alt={name}
        width={200}
        style={{ border: "1px solid #ccc", marginBottom: "20px" }}
      />
      <p><strong>Price:</strong> ₹{price}</p>
      <p><strong>Category:</strong> {main_category || "N/A"}</p>
      <p><strong>Description:</strong> {description || "No description available."}</p>
    </div>
  );
};

export default ProductDetails;
