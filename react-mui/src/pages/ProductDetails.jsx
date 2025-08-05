import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../services/api';
import Loader from '../components/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div style={{ padding: 20 }}>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} width={200} />
      <p>Price: ₹{product.price}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
    </div>
  );
};

export default ProductDetails;
