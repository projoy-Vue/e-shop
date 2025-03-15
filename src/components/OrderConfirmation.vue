<template>
    <div class="confirmation">
      <h2>Order Confirmed! 🎉</h2>
      <p>Thank you for your purchase!</p>
      <router-link to="/" class="continue-shopping">Continue Shopping</router-link>
    </div>
  </template>
  
  <style scoped>
  .confirmation {
    text-align: center;
    padding: 40px;
  }
  
  .continue-shopping {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background: #41b883;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  </style>