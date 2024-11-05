<template>
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2024 Mercado Colegial. All Rights Reserved.</p>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: green;
    padding: 20px;
    text-align: center;
    border-top: 1px solid #ccc;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer p {
    margin: 0;
    color: #252525;
  }
  
  .footer-links {
    margin-top: 10px;
  }
  
  .footer-links a {
    margin: 0 10px;
    color: #001fcc;
    text-decoration: none;
  }
  
  .footer-links a:hover {
    text-decoration: underline;
  }
  </style>
  