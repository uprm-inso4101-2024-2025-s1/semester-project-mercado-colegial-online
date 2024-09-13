<template>
  <div class="home">
    <Navbar />
    <div class="image-section">
      <div class="search-container">
        <SearchBar />
      </div>
    </div>
    <div class="featured-products-section">
      <FeaturedProducts :products="productsList" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import SearchBar from "../components/SearchBar.vue";
import FeaturedProducts from "../components/FeaturedProducts.vue";
import placeholderImage from "../assets/placeholder.svg"; // Import the placeholder image
import Footer from "../components/Footer.vue"

export default {
  name: "Home",
  components: {
    Navbar,
    SearchBar,
    FeaturedProducts,
    Footer
  },
  data() {
    return {
      productsList: [
        {
          id: 1,
          name: "Custom T-shirt",
          price: "$19.99",
          seller: "SHOP123",
          image: placeholderImage, // Placeholder image
        },
        {
          id: 2,
          name: "RUM Lanyard",
          price: "$19.99",
          seller: "SHOP123",
          image: placeholderImage,
        },
        {
          id: 3,
          name: "UPRM Hoodie",
          price: "$19.99",
          seller: "SHOP123",
          image: placeholderImage,
        },
        {
          id: 4,
          name: "Campus Mug",
          price: "$9.99",
          seller: "SHOP123",
          image: placeholderImage,
        },
        {
          id: 5,
          name: "College Cap",
          price: "$15.99",
          seller: "SHOP123",
          image: placeholderImage,
        },
        {
          id: 6,
          name: "Keychain",
          price: "$4.99",
          seller: "SHOP123",
          image: placeholderImage,
        },
        {
          id: 7,
          name: "Sticker Pack",
          price: "$5.99",
          seller: "SHOP123",
          image: placeholderImage,
        },
        {
          id: 8,
          name: "Notebook",
          price: "$12.99",
          seller: "SHOP123",
          image: placeholderImage,
        },
      ],
    };
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
  margin: auto;
}

.image-section {
  width: 100%; /* Full width of the viewport */
  height: 80vh; /* Adjust the height as needed */
  background-image: url("../assets/background-search.jpg"); /* Correct path to your image */
  background-size: cover; /* Cover ensures the image fills the section */
  background-position: center; /* Center the background image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center; /* Horizontally center the search bar */
  align-items: center; /* Vertically center the search bar */
}

.search-container {
  width: 100%;
  max-width: 600px; /* Control the max width of the search bar */
  padding: 0 20px; /* Add some padding for responsiveness */
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar {
  width: 100%;
}

.featured-products-section {
  margin-top: 10px; /* Add space between the search section and the products */
  padding: 20px;
}
</style>
