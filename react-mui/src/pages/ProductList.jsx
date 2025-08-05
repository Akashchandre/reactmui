import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchProducts } from "../services/api";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchProducts(page + 1);
        const data = res.products || [];

          const flat = data.map((item) => {
        console.log("ITEM MRP:", item.name, item.mrp); 
        return {
          ...item,
          price: item.mrp?.mrp ?? null,
        };
      });

        setProducts(flat);
        setTotalCount(parseInt(res.totalResults) || 0);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
      setLoading(false);
    };

    load();
  }, [page]);

  useEffect(() => {
    let filteredData = [...products];

    if (search) {
      filteredData = filteredData.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filteredData = filteredData.filter(
        (p) => p.main_category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (sortOrder === "asc") {
      filteredData.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortOrder === "desc") {
      filteredData.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFiltered(filteredData);
  }, [products, search, category, sortOrder]);

  const categories = ["All", ...new Set(products.map((p) => p.main_category).filter(Boolean))];

  const columns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <img
        src={params.row.images?.front || "https://placehold.co/50x50?text=No+Img"}
        alt={params.row.name}
        style={{ width: 50, height: 50, objectFit: "contain" }}
      />
    ),
  },
  { field: "name", headerName: "Name", width: 300 },
  { field: "main_category", headerName: "Category", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    renderCell: (params) => {
      const price = params.row?.price;
      return typeof price === "number" ? `₹${price}` : "N/A";
    },
  },
];

  return (
    <div style={{ width: "90%", margin: "20px auto" }}>
      <h2 style={{ textAlign: "center" }}>Product List</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <DataGrid
        rows={filtered}
        columns={columns}
        getRowId={(row) => row.id || row.sku_code || row.name}
        page={page}
        pageSize={pageSize}
        pagination
        paginationMode="server"
        rowCount={totalCount}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newSize) => setPageSize(newSize)}
        rowsPerPageOptions={[10, 25, 50]}
        loading={loading}
        onRowClick={(params) =>
          navigate(`/product/${params.row.id || params.row.sku_code}`)
        }
        style={{ height: 600, cursor: "pointer" }}
      />
    </div>
  );
};

export default ProductList;
