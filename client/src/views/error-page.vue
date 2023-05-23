<template>
    <div class="error-container">
      <h2>Error</h2>
      <p>{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      errorMessage : {
        type: String,
        default: ''
      }
    },
  };
  </script>
  
  <style>
  .error-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    color: red;
  }
  </style>
  