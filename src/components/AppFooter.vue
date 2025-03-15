<template>
    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; 2023 E-Shop. All rights reserved.</p>
        <div class="social-links">
          <a href="#">Twitter</a>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </footer>
  </template>
  
  <style scoped>
  .app-footer {
    background: #34495e;
    color: white;
    padding: 2rem;
    margin-top: auto;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .social-links a {
    color: white;
    text-decoration: none;
    margin-left: 1.5rem;
  }
  </style>