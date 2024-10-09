<template>
  <div class="home">
    <Navbar />
    <div class="image-section">
      <div class="search-container" v-if="isDesktop">
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
import placeholderImage from "../assets/placeholder.svg";
import Footer from "../components/Footer.vue";

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
          image: placeholderImage,
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
      isDesktop: window.innerWidth > 768, // Check if the initial screen size is desktop
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize); // Listen for window resize
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize); // Clean up the event listener
  },
  methods: {
    handleResize() {
      this.isDesktop = window.innerWidth > 768; // Update the flag based on screen width
    },
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
  width: 100%;
  height: 80vh;
  background-image: url("../assets/background-search.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

.search-container {
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.featured-products-section {
  margin-top: 10px;
  padding: 20px;
}
</style>
