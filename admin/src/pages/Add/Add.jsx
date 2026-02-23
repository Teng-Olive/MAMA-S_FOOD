import React, { useState } from "react";
import upload_img from "../../assets/upload_img.png";
import './Add.css';
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Cultural Specials"); // Default to a real category

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", Number(price)); // Ensure price is sent as a number
            formData.append("category", category);
            if (image) formData.append("image", image);
            
           console.log("Current Token:", token);
           const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
    headers: { 
        token: token // Ensure this matches what your backend middleware expects
    },
});
            

            if (response.data.success) {
                toast.success(response.data.message);
                setName("");
                setDescription("");
                setPrice("");
                setImage(null);
                setCategory("Cultural Specials");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="form-container">
            <div>
                <p className="form-label">Upload Image</p>
                <div className="image-upload-container">
                    <label htmlFor="image">
                        <img
                            src={!image ? upload_img : URL.createObjectURL(image)}
                            alt="Preview"
                            className="upload-preview"
                        />
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            id="image"
                            hidden
                        />
                    </label>
                </div>
            </div>
            <div className="form-group">
                <p className="form-label">Product Name</p>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Enter product name"
                    className="form-input"
                    required
                />
            </div>
            <div className="form-group">
                <p className="form-label">Product Description</p>
                <textarea
                    placeholder="Type product description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="form-input"
                    required
                />
            </div>
            <div className="form-group-horizontal">
                <div>
                    <p className="form-label">Product Category</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="form-select"
                    >
                        {/* Values must match your HomeCollection categories exactly */}
                        <option value="Cultural Specials">Cultural Specials</option>
                        <option value="Spaghetti">Spaghetti</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Rice">Rice</option>
                        <option value="Noodles">Noodles</option>
                        <option value="Chicken">Chicken</option>
                        <option value="Drinks">Drinks</option>
                    </select>
                </div>
                <div>
                    <p className="form-label">Product Price</p>
                    <input
                        type="number"
                        className="form-input price-input"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder="3500"
                        required
                    />
                </div>
            </div>
            <button type="submit" className="submit-button">ADD PRODUCT</button>
        </form>
    );
};

export default Add;