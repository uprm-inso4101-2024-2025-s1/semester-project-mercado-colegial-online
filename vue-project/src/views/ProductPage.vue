<template>
  <Navbar />
  <div class="listing-container">
    <div class="tab-section">
      <a href="#" class="tab active">Seller's Listing Page</a>
      <a href="#" class="tab">Buyer's Preview of Listing</a>
    </div>

    <div class="content-section">
      <div class="image-section">
        <!-- Image Placeholder -->
         <!-- IDEA: INTENTAR PONER MAS FOTOS Y PODER ROTAR POR LAS FOTOS -->
        <div class="image-placeholder">
          <img :src="product.image" alt="Product Image" class="product-image" />
        </div>
      </div>

      <div class="details-section">
        <h1>{{product.name}}</h1>
        <p class="labels">Descriptive Labels</p>
        <h2>{{ product.price }}</h2>

        <div class="form-box">
          <p class="description">Small Description Of Item</p>
          
          <div class="variant-section">
            <select class="variant-select">
              <option>Choose Variant...</option>
            </select>
            
            <select>
              <option>Choose Amount...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            
            <button>Purchase</button>
          </div>
          
          <div class="delivery-section">
            <select>
              <option>Delivery Type (Pickup, Drop-off, Shipping, etc.)</option>
            </select>
          </div>
          <div class="seller-info" :class="{ expanded: isSellerInfoExpanded }" @click="toggleSellerInfo">
            <div class="seller-summary">
              <img :src="product.image"/>
              <p class="seller-name">{{ product.seller }}</p>
              <span class="arrow" :class="{'arrow-up': isSellerInfoExpanded, 'arrow-down': !isSellerInfoExpanded}"></span>
            </div>
            <div v-if="isSellerInfoExpanded" class="seller-details">
              <p>Small Biography Of Seller</p>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  </div>
  <FooterProduct />
</template>

<script>
import Navbar from "../components/Navbar.vue";
import placeholderImage from "../assets/placeholder.svg";
import FooterProduct from "../components/Footer.vue";

export default {
    name: "ProductPage",
    components: {
        FooterProduct,
        Navbar,
    },
  data() {
    return {
      product: {},
      isSellerInfoExpanded: false,
    };
  },
  mounted() {
    const productId = this.$route.params.id;
    this.fetchProduct(productId);
  },
  methods: {
    toggleSellerInfo() {
      this.isSellerInfoExpanded = !this.isSellerInfoExpanded;
    },

    fetchProduct(id) {
      // Simulación de obtención de datos. En una aplicación real, se podría hacer una llamada a la API aquí.
      const products = [
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
      ]

      this.product = products.find(product => product.id === parseInt(id));
    },
  },
};
</script>

<style scoped>

.listing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: #d8f9d3;
 
  
}

.tab-section {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  text-decoration: none;
  color: #000;
  font-weight: bold;
  border-bottom: 2px solid transparent;
}

.tab.active {
  border-bottom: 2px solid #000;
}

.content-section {
  display: flex;
  width: 100%;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  border-radius: 8px;
  padding: 20px;
}

.image-placeholder img {
  width: 100%;
  max-width: 500px;
  height: auto;
}

.details-section {
  flex: 1;
  padding: 0 20px;
}

.details-section h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.details-section h2 {
  font-size: 45px;
  color: #2ecc71;
  position: relative;
  bottom: 40px;
}

.description {
  position: relative;
  bottom: 25px;
  margin-left: 5px;
  color: darkgray;
}

.labels {
  background-color: #d3f5d8;
  padding: 5px 10px;
  display: inline-block;
  margin-bottom: 10px;
  border-radius: 10px;
  color: #000;
}

.variant-section select {
  width: 49%;
  padding: 10px;
  gap: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
 
}

.variant-select {
  margin-right: 10px;
}

.variant-section button {
  width: 99.5%;
  padding: 10px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  top: 10px;
}

.variant-section button:hover {
  background-color: black;
}

.seller-info {
  width: 47%;
  max-height: max-content;
  margin: 20px 0;
  background-color: white;
  border-radius: 8px;
  border-style: solid;
  border-width: 0.5px;
  border-color: #858181;
  padding: 5px;
  cursor: pointer;
  position: relative;
  z-index: 100;
}

.seller-info.expanded {
  position: absolute; /* Posiciona el contenido desplegable de manera absoluta */
  top: 100%; /* Desplázalo justo debajo del contenedor del vendedor */
  left: 0;
  width: 83.4%;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Añade una sombra para resaltarlo */
  padding: 5px;
  z-index: 1000;
}

.seller-info img {
  width: 50px;
  border-radius: 50%;
  padding: 1px;
  
}

.seller-info.expanded img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 1px;
}

.seller-summary {
  display: flex;
  justify-content: space-between;
}

.seller-name {
  font-weight: bold;
  font-size: 15px;
  position: relative;
  right: 100px;
  top: 3px;

}

.seller-info.expanded .seller-name {
  position: relative;
  right: 220px;
  top: 15px;
}

.arrow {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
  align-self: center;
}

.arrow-up {
  transform: rotate(-135deg);
}

.arrow-down {
  transform: rotate(45deg);
}

.seller-details {
  margin-top: 10px;
}

.seller-details p {
  font-size: 14px;
  color: #858181;
}

.delivery-section select {
  width: 85%;
  padding: 10px;
  margin-top: 30px;
  border-radius: 10px;
  cursor: pointer;
}

.form-box {
  position: relative;
  bottom: 40px;
}
</style>