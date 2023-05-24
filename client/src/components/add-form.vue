<template>
    <div class="addform-container">
        <div class="clickable-svg" @click="showForm = true">
        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34.0832 41.5833V52.8333C34.0832 53.8958 34.4432 54.7871 35.1632 55.5071C35.8833 56.2271 36.7733 56.5858 37.8332 56.5833C38.8957 56.5833 39.787 56.2233 40.507 55.5033C41.227 54.7833 41.5858 53.8933 41.5832 52.8333V41.5833H52.8332C53.8957 41.5833 54.787 41.2233 55.507 40.5033C56.227 39.7833 56.5857 38.8933 56.5832 37.8333C56.5832 36.7708 56.2232 35.8796 55.5032 35.1596C54.7832 34.4396 53.8932 34.0808 52.8332 34.0833H41.5832V22.8333C41.5832 21.7708 41.2232 20.8796 40.5033 20.1596C39.7832 19.4396 38.8932 19.0808 37.8332 19.0833C36.7707 19.0833 35.8795 19.4433 35.1595 20.1633C34.4395 20.8833 34.0807 21.7733 34.0832 22.8333V34.0833H22.8333C21.7708 34.0833 20.8795 34.4433 20.1595 35.1633C19.4395 35.8833 19.0808 36.7733 19.0833 37.8333C19.0833 38.8958 19.4433 39.7871 20.1633 40.5071C20.8833 41.2271 21.7733 41.5858 22.8333 41.5833H34.0832ZM37.8332 75.3333C32.6457 75.3333 27.7708 74.3483 23.2083 72.3783C18.6458 70.4083 14.677 67.7371 11.302 64.3646C7.927 60.9896 5.25575 57.0208 3.28825 52.4583C1.32075 47.8958 0.335752 43.0208 0.333252 37.8333C0.333252 32.6458 1.31825 27.7708 3.28825 23.2083C5.25825 18.6458 7.9295 14.6771 11.302 11.3021C14.677 7.92709 18.6458 5.25584 23.2083 3.28834C27.7708 1.32084 32.6457 0.335844 37.8332 0.333344C43.0207 0.333344 47.8957 1.31834 52.4582 3.28834C57.0207 5.25834 60.9895 7.92959 64.3645 11.3021C67.7395 14.6771 70.412 18.6458 72.382 23.2083C74.352 27.7708 75.3357 32.6458 75.3332 37.8333C75.3332 43.0208 74.3482 47.8958 72.3783 52.4583C70.4082 57.0208 67.737 60.9896 64.3645 64.3646C60.9895 67.7396 57.0207 70.4121 52.4582 72.3821C47.8957 74.3521 43.0207 75.3358 37.8332 75.3333Z" fill="#E94C89"/>
        </svg>
            </div>
            <div class="overlay" v-if="showForm">
                <div class="form-card">
                    <!-- Form content here -->
                    <span class="close-icon" @click="closeForm">
                        <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="26.5" cy="26.5" r="26.5" fill="white"/>
                        <path d="M34 20.41L32.59 19L27 24.59L21.41 19L20 20.41L25.59 26L20 31.59L21.41 33L27 27.41L32.59 33L34 31.59L28.41 26L34 20.41Z" fill="black"/>
                        </svg>
                    </span>
                </div>
                <div class="overlay-background" @click="closeForm"></div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showForm: false
      };
    },
    methods: {
    closeForm(event) {
    event.stopPropagation();
    this.showForm = false;
  }
  }
  };
  </script>
  
  <style scoped>

  .addform-container{
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 110px;
    margin-bottom: 90px;
  }
  .clickable-svg {
  display: inline-block;
  position: relative;
  transition: transform 0.3s;
  cursor: pointer;
}

.clickable-svg:hover {
  transform: scale(1.2); /* Adjust the scale value as needed */
}

.svg-icon {
  width: 100%;
  height: 100%;
}
  
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .form-card {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
    height: 500px;
    position: relative;
    z-index: 100;
  }
  
  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
  }
  
  .overlay-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 90;
  }
  </style>
  