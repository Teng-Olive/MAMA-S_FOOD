import React, { useContext, useState } from "react"; // Importing React and necessary hooks
import { ShopContext } from "../../context/ShopContext"; // Importing ShopContext to access global state
import "./HomeCollection.css"; // Importing CSS file for styling
import { categoryItem } from "../../assets/assets"; // Importing category items data

const HomeCollection = () => {
  // Extracting products and addToCart function from ShopContext
  const { products, addToCart, currency } = useContext(ShopContext);

  // State to manage the selected category (default is "All")
  const [category, setCategory] = useState("All");

  return (
    <div className="product-container">
      {/* Header Section */}
      <div className="list_header">
        <h1>Discover Our Menu</h1>
        <hr className="divider" />
      </div>

      {/* Product Display Section */}
      <div className="container">
        {/* Category Selection Section */}
        <div className="category-section">
          <h1>Explore Our Categories</h1>
          <ul className="category-list">
            {/* Mapping through category items and rendering category list */}
            {categoryItem.map((item, index) => (
              <li
                key={index} // Assigning unique key for each category item
                onClick={() => 
                  setCategory((prev) => (prev === item.category_title ? "All" : item.category_title))
                } // Toggle category selection (if already selected, reset to "All")
                className={category === item.category_title ? "active" : ""} // Adding active class for selected category
              >
                {item.category_title} {/* Display category title */}
              </li>
            ))}
          </ul>
        </div>

        {/* Product Grid Section */}
        <div className="product-grid">
          {/* Checking if products exist */}
          {products.length > 0 ? (
            products
              .filter((product) => category === "All" || category === product.category) // Filtering products based on selected category
              .map((product) => (
                <div className="product-card" key={product._id}> {/* Assigning unique key to each product */}
                  <div className="product-image">
                    {/* Displaying Product Image */}
                    <img src={product.image} alt={product.title} />
                  </div>

                  {/* Displaying Product Name */}
                  <h3>{product.name}</h3>

                  {/* Price and Add to Cart Button */}
                  <div className="price-add">
                    <p>{product.price} <span style={{fontSize: '0.7em'}}>{currency}</span></p>
                    <button
                      onClick={() => addToCart(product._id)} // Calling addToCart function with product ID
                      className="add-to-cart-button"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
          ) : (
            // Display message if no products are found in the selected category
            <p className="no-products-message">
              No products found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeCollection;
