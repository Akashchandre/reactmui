import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const ProductTable = ({ products, page, setPage, totalProducts, loading }) => {
  const navigate = useNavigate();

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <img src={params.row.imageUrl} alt="product" width="50" />
      )
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'price', headerName: 'Price', width: 100 },
  ];

  return (
    <DataGrid
      rows={products}
      columns={columns}
      pageSize={10}
      page={page - 1} // MUI DataGrid uses 0-based page index
      pagination
      paginationMode="server"
      rowCount={totalProducts}
      onPageChange={(newPage) => setPage(newPage + 1)} // Convert back to 1-based
      loading={loading}
      onRowClick={(params) => navigate(`/product/${params.id}`)}
    />
  );
};

export default ProductTable;
