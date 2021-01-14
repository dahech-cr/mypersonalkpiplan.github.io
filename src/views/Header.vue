<template>
  <div class="rozklad__header" style="padding-bottom: 80px">
    <v-app-bar fixed dense color="white" :prominent="false">
      <v-app-bar-nav-icon
        color="black"
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <div class="kpi__logo">
        <div class="kpi__tittle">Kpi Rozklad</div>
        <img
          class="logo"
          style="height: 30px"
          src="../assets/kpi_0.png"
          alt=""
        />
      </div>

      <v-spacer class="hidden-sm-and-down"></v-spacer>

      <div class="header__menu hidden-sm-and-down">
        <div class="menu">
          <router-link
            class="menu__item"
            v-for="item in links"
            :key="item.to"
            :to="item.to"
            tag="div"
            active-class="item__active"
          >
            <div class="item__text">{{ item.text }}</div>
          </router-link>
        </div>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" light fixed left temporary>
      <div class="header__navigator">
        <div class="navigator">
          Усе необхідне <v-icon right color="black"> mdi-chevron-down </v-icon>
        </div>
      </div>
      <div nav dense>
        <v-list-item-group v-model="group" active-class="item__active-mob">
          <v-list-item v-for="item in links" :key="item.to" :to="item.to">
            <v-list-item-title> {{ item.text }} </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "vheader",
  data() {
    return {
      drawer: false,
      group: null,
      model: 1,
      links: {
        1: {
          to: "/searchgroup",
          text: "Розклад занять",
        },
        2: {
          to: "/session",
          text: "Розклад сессії",
        },
        3: {
          to: "/teacher",
          text: "Розклад для викладачів",
        },
        4: {
          to: "/",
          text: "Про Кпі",
        },
      },
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Langar&display=swap");
$grey-low: #686868;

.rozklad__header {
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.kpi__logo {
  //height: 48px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.kpi__tittle {
  font-size: 20px;
}
.logo {
  height: 40px;
  margin-left: 10px;
}
.item__active-mob {
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  & .v-list-item__title {
    color: rgb(255, 255, 255);
  }
}
.item__text {
  margin: 0 20px;
  font-size: 18px;
  font-family: "Langar";
  font-weight: 400;

  //transition-duration: 1s;

  // &:hover {
  //   border-bottom: 1px solid rgb(0, 0, 0);
  // }
}
.header__navigator {
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navigator {
  height: 30px;
}
.menu {
  display: flex;
  flex-direction: row;
}
.header__menu {
  color: rgb(0, 0, 0);
  padding-top: 10px;
  width: auto;
  height: 100%;
  margin: 0 auto;
}
.menu__item {
  margin: 0 3px;
  &:hover {
    color: $grey-low;
    cursor: pointer;
  }
}
.item__active {
  border-bottom: 1px solid #000000;
  &:hover {
    color: rgb(0, 0, 0);
    cursor: pointer;
  }
}
.unselectable {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  not supported by any browser */
}
</style>