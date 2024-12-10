import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import { addProduct } from "../api/api"; // Ensure this path is correct

const Add = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Statues");
  const [subCategory, setSubCategory] = useState("Classic");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [description, setDescription] = useState("");

  const fileInputRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Prepare FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", parseFloat(price));  // Changed to parseFloat for decimal prices
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("width", parseFloat(width));  // Append width
    formData.append("height", parseFloat(height));  // Append height
    formData.append("description", description);  // Append description
    if (image) {
      formData.append("image", image);
    }

    try {
      await addProduct(formData);
      Swal.fire({
        title: "Success!",
        text: "Product added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form
      setName("");
      setPrice("");
      setCategory("Statues");
      setSubCategory("Classic");
      setWidth("");
      setHeight("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Error adding product.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Price</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full px-3 py-2 sm:w-[120px]"
          type="number"
          placeholder="25"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Statues">Statues</option>
            <option value="Photography">Photography</option>
            <option value="Paints">Paints</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Classic">Classic</option>
            <option value="Modern">Modern</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Width</p>
        <input
          onChange={(e) => setWidth(e.target.value)}
          value={width}
          className="w-full max-w-[500px] px-3 py-2"
          type="number"
          placeholder="Width (in cm)"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Height</p>
        <input
          onChange={(e) => setHeight(e.target.value)}
          value={height}
          className="w-full max-w-[500px] px-3 py-2"
          type="number"
          placeholder="Height (in cm)"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Product Description"
          required
        />
      </div>

      <div className="w-full mb-4">
        <p className="mb-2">Upload Image</p>
        <div
          onClick={openFileDialog}
          className="w-full max-w-[200px] h-40 border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer"
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
          ) : (
            <div className="text-center text-gray-500">
              <p>Upload</p>
              <p className="text-sm">Click to select image</p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          type="file"
          accept="image/*"
        />
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white hover:bg-gray-800"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
