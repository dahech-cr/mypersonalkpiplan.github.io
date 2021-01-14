<template>
  <div>
    <h1 class="text-center">
      Teacher
    </h1>
  </div>
</template>

<script>
export default {
  name: "MainTeacher",
  data() {
    return {
      isTonyaPhotoVis: false,
    };
  },
  methods: {
    tonyaPhotoVis() {
      this.isTonyaPhotoVis = !this.isTonyaPhotoVis;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Hanalei+Fill&display=swap");

.tonya__buttons {
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
}

.tonya__text {
  color: black;
  &:focus {
    color: red;
  }
}

.button_ref {
  text-decoration: none;
}

.button {
  margin: 0 30px;
  transition-duration: 0.25s;
  box-shadow: 1px 7px 9px rgba(0, 0, 0, 0.2);
  //font-family: "Hanalei Fill", cursive;
  font-family: "Audiowide", cursive;

  outline: none;
  padding: 10px;
  min-width: 300px;
  border-radius: 22px;
  border: 1px solid rgb(255, 255, 255);
  background-color: rgb(255, 255, 255);

  &:hover {
    border: 1px solid rgb(0, 0, 0);
    //background-color: rgb(255, 0, 0);
  }
  &:active {
    background-color: rgb(0, 0, 0);
    .tonya__text {
      color: rgb(255, 255, 255);
    }
  }
}

.tonya__photo {
  margin: 0 auto;
  margin-top: 20px;
  max-width: 400px;
  max-height: 400px;
  & img {
    border: 1px solid black;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    //height: 20px;
  }
}
</style>