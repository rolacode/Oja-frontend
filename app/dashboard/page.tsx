"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreateProduct = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    vendorId: "",
    categoryId: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // ✅ Show preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.name || !formData.description || !formData.price || !formData.vendorId || !formData.categoryId || !imageFile) {
      setErrorMessage("All fields are required.");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("vendorId", formData.vendorId);
    formDataToSend.append("categoryId", formData.categoryId);
    formDataToSend.append("image", imageFile);
  
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/v1/vendors/createProduct", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.data.success) {
        alert("✅ Product created successfully!");
        router.push("/shop");
      } else {
        console.error("❌ API Response Error:", response.data);
        setErrorMessage(response.data.error || "Failed to create product.");
      }
    } catch (error: any) {
      console.error("❌ API Request Error:", error?.response?.data || error);
  
      setErrorMessage(
        error.response?.data?.error || "An unexpected error occurred. Check console for details."
      );
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create a New Product</h2>

        {errorMessage && <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Product Description" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Product Price" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />

          <div>
            <label className="block text-gray-700 font-medium mb-1">Upload Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} required className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-full h-40 object-cover rounded-lg shadow-md" />}
          </div>

          <input type="text" name="vendorId" value={formData.vendorId} onChange={handleChange} placeholder="Vendor ID" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <input type="text" name="categoryId" value={formData.categoryId} onChange={handleChange} placeholder="Category ID" required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />

          <button type="submit" disabled={loading} className="w-full p-3 bg-blue-500 text-white rounded-lg disabled:bg-gray-300">
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
