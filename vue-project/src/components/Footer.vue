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
  background-color: #f8f8f8;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #ccc;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer p {
  margin: 0;
  color: #333;
}

.footer-links {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-links a {
  margin: 5px 10px;
  color: #0066cc;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

/* Responsive Styles */
@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }

  .footer-links {
    margin-top: 0;
  }
}
</style>
