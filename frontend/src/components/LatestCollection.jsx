import { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch("https://diagonalley.runasp.net/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Sort products by `createdAt` field in descending order and take the top 10
        const latest = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);

        setLatestProducts(latest);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Don't forget to take a look on our latest collection.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProducts.map((item) => (
            <ProductItem
              key={item.id} // Ensure unique key
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestCollection;
