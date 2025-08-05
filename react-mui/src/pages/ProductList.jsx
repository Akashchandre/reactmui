import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductTable from '../components/ProductTable';
import Loader from '../components/Loader';
import ErrorComponent from '../components/ErrorComponent';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(page);
        setProducts(data.products);
        setTotalProducts(data.total);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching products:", e);
        setError(true);
        setLoading(false);
      }
    };

    load();
  }, [page]);

  if (loading) return <Loader />;
  if (error) return <ErrorComponent />;

  return (
    <div style={{ height: 600, width: '90%', margin: 'auto' }}>
      <h2>Product List</h2>
      <ProductTable
        products={products}
        page={page}
        setPage={setPage}
        totalProducts={totalProducts}
        loading={loading}
      />
    </div>
  );
};

export default ProductList;
