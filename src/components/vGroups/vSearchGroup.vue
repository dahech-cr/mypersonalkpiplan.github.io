<template>
  <div>
    <v-row  justify="center">
      <v-col class="white" cols="8" sm="5" md="4">
        <v-text-field
          dense
          color="black"
          autocomplete="off"
          @focus="CHANGE_LIST_VIS(true)"
          :checked="filteredGroup"
          v-model="groupNameSearchString"
          label="Група"
        ></v-text-field>

        <!-- <v-text-field
          autocomplete="off"
          @focus="CHANGE_LIST_VIS(true)"
          :checked="filteredGroup"
          v-model="groupNameSearchString"
          label="Group"
        ></v-text-field> -->

        <v-list flat v-if="RETURN_LIST_VIS">
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              class="item"
              v-for="(photo, index) in groupsArray"
              v-bind:key="index"
              :checked="selectedGroupItem"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ photo.group_full_name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>

    <v-row v-if="IS_GROUP_FOUND" justify="center">
      <v-col cols="8" sm="5" md="4">
        <v-alert dense outlined type="error">
          <strong>NOT</strong> found
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "searchGroup",
  data() {
    return {
      stateSelectedItem: "",
      selectedName: "22",
      selectedItem: 0,
      isListVis: false,
      isGroupFound: false,
      groupNameSearchString: "",
      groupNameForQuery: "",
      photoFeed: null,
      groupsArray: [],
      inputName: "",
    };
  },

  computed: {
    ...mapGetters(["RETURN_LIST_VIS"]),
    ...mapGetters(["IS_GROUP_FOUND"]),
    ...mapGetters(["REZULT_ARRAY"]),

    filteredGroup() {
      let vm = this;
      //this.selectedItem = null;

      this.url_slug(this.groupNameSearchString);

      if (
        vm.groupNameSearchString.length >= 2 &&
        vm.inputName != vm.groupNameSearchString
      ) {
        //this.selectedItem = 0;
        this.SEARCH_GROUP(this.groupNameForQuery);

        this.selectedItem = null;

        // axios
        //   .get(
        //     "http://api.rozklad.org.ua/v2/groups/?search={'query':'" +
        //       this.groupNameForQuery +
        //       "'}"
        //   )
        //   .then((response) => {
        //     this.photoFeed = response.data.data;
        //     this.CHANGE_GROUP_FOUND(false)
        //   })
        //   .catch((error) => (this.CHANGE_GROUP_FOUND(true),this.GET_GROUP_NAME(null), vm.groupsArray = null ));\

        vm.groupsArray = vm.REZULT_ARRAY;
        //console.log(vm.groupsArray)

        vm.inputName = "";
      } else if (vm.groupNameSearchString.length < 2) {
        vm.groupsArray = [];
      } else {
        vm.groupsArray = vm.REZULT_ARRAY;
        //     vm.groupsArray = []
      }
      vm.inputName = vm.groupNameSearchString;
      //this.selectedItem = null;
    },

    selectedGroupItem() {
      if (this.selectedItem != undefined) {
        this.GET_GROUP_NAME(this.REZULT_ARRAY[this.selectedItem].group_id);

        this.selectedName = this.REZULT_ARRAY[
          this.selectedItem
        ].group_full_name.replace(/\ .*/, "");

        this.groupNameSearchString = this.selectedName;

        this.CHANGE_LIST_VIS(false);

        console.log("Item  " + this.selectedItem);
      }
      return this.selectedItem;
    },
  },

  methods: {
    ...mapActions(["GET_GROUP_NAME"]),
    ...mapActions(["CHANGE_LIST_VIS"]),
    ...mapActions(["CHANGE_GROUP_FOUND"]),
    ...mapActions(["SEARCH_GROUP"]),

    url_slug(s, opt) {
      s = String(s);
      opt = Object(opt);

      var defaults = {
        delimiter: "-",
        limit: undefined,
        lowercase: true,
        replacements: {},
        transliterate: true,
      };

      // Merge options
      for (var k in defaults) {
        if (!opt.hasOwnProperty(k)) {
          opt[k] = defaults[k];
        }
      }

      var char_map = {
        // Russian
        А: "A",
        Б: "B",
        В: "V",
        Г: "G",
        Д: "D",
        Е: "E",
        Ё: "Yo",
        Ж: "Zh",

        З: "Z",
        И: "I",
        Й: "J",
        К: "K",
        Л: "L",
        М: "M",
        Н: "N",
        О: "O",
        П: "P",
        Р: "R",
        С: "S",
        Т: "T",
        У: "U",
        Ф: "F",
        Х: "H",
        Ц: "C",
        Ч: "Ch",
        Ш: "Sh",
        Щ: "Sh",
        Ъ: "",
        Ы: "I",
        Ь: "",
        Э: "E",
        Ю: "Yu",
        Я: "Ya",

        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "yo",
        ж: "zh",
        з: "z",
        и: "i",
        й: "y",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "ts",
        ч: "ch",
        ш: "sh",
        щ: "sh",
        ъ: "",
        ы: "i",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",

        // Ukrainian
        Є: "Ye",
        І: "I",
        Yi: "Ї",
        Ґ: "G",
        є: "ye",
        і: "i",
        ї: "yi",
        ґ: "g",
      };

      // Make custom replacements
      for (var k in opt.replacements) {
        s = s.replace(RegExp(k, "g"), opt.replacements[k]);
      }

      // Transliterate characters to ASCII
      if (opt.transliterate) {
        for (var k in char_map) {
          s = s.replace(RegExp(k, "g"), char_map[k]);
        }
      }

      // Replace non-alphanumeric characters with our delimiter
      var alnum = RegExp("[^a-z0-9]+", "ig");
      s = s.replace(alnum, opt.delimiter);

      // Remove duplicate delimiters
      s = s.replace(RegExp("[" + opt.delimiter + "]{2,}", "g"), opt.delimiter);

      // Truncate slug to max. characters
      s = s.substring(0, opt.limit);

      // Remove delimiter from ends
      s = s.replace(
        RegExp("(^" + opt.delimiter + "|" + opt.delimiter + "$)", "g"),
        ""
      );

      //console.log("Latter" + opt.lowercase ? s.toLowerCase() : s);

      this.groupNameForQuery = opt.lowercase ? s.toLowerCase() : s;
    },
  },

  mounted() {},
};
</script>

<style lang="scss">
.item {
  padding: 4px;
  &:hover {
    background-color:  #f7f7f7;
    cursor: pointer;
    color: rgb(0, 0, 0);
  }
}
.v-input__control {
  max-height: 27px;
}
#input-7 {
  padding-left: 2px;
}
</style>