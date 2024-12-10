import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";

const Collection = () => {
  const { search, setSearch } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [showFilter, setShowFilter] = useState(true);
  const [showSearch, setShowSearch] = useState(false); // state to control search visibility

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://diagonalley.runasp.net/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setFilterProducts(data);

        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);

        const uniqueSubCategories = [
          ...new Set(data.map((item) => item.subCategory)),
        ];
        setSubCategories(uniqueSubCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const applyFilter = () => {
    let filtered = products;

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((p) => category.includes(p.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((p) => subCategory.includes(p.subCategory));
    }

    setFilterProducts(filtered);
  };

  const sortProducts = () => {
    let sorted = [...filterProducts];

    if (sortType === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(sorted);
  };

  const toggleCategory = (value) => {
    setCategory((prevCategory) => {
      if (prevCategory.includes(value)) {
        return prevCategory.filter((item) => item !== value);
      } else {
        return [...prevCategory, value];
      }
    });
  };

  const toggleSubCategory = (value) => {
    setSubCategory((prevSubCategory) => {
      if (prevSubCategory.includes(value)) {
        return prevSubCategory.filter((item) => item !== value);
      } else {
        return [...prevSubCategory, value];
      }
    });
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  const getCollectionHeadline = () => {
    if (category.length === 0 && subCategory.length === 0) {
      return "ALL Collections";
    }
    if (category.length > 0) {
      return `${category.join(", ")} Collections`;
    }
    if (subCategory.length > 0) {
      return `${subCategory.join(", ")} Collections`;
    }
    return "Collections";
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.map((cat) => (
              <p key={cat} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  onChange={() => toggleCategory(cat)}
                  checked={category.includes(cat)}
                />{" "}
                {cat}
              </p>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {subCategories.map((subCat) => (
              <p key={subCat} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={subCat}
                  onChange={() => toggleSubCategory(subCat)}
                  checked={subCategory.includes(subCat)}
                />{" "}
                {subCat}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Products */}
      <div className="flex-1 ">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={getCollectionHeadline()} text2="" style={{ fontSize: '1.25rem', fontWeight: '600' }} />

          {/* Conditionally render the Search Input */}
          {showSearch && (
            <input
              type="text"
              placeholder="Search Products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 border-gray-300 text-sm px-2 py-1 rounded"
            />
          )}

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
