<template>
  <div>

    <v-row style="margin-top:10px" justify="center">
      <v-col cols="8" sm="5" md="4">
        <v-btn
          :loading="loading"
          target="_blanck"
          @click="getSession"
          class="white black--text getSession"
          block
          elevation="3"
          >Розклад сессії</v-btn
        >
      </v-col>
    </v-row>

    <v-row v-if="isAlertVis" justify="center">
      <v-col  cols="8" sm="5" md="4">
        <v-alert   dense outlined type="error"> Select a group </v-alert>
      </v-col>
    </v-row>

    <div id="table__desktop" v-show="isTD" v-if="isTableVis">
      <div class="week" v-for="(item, index) in lessonsKpi.weeks" :key="index">
        <div class="week__number">{{ item.week_number }} Week</div>
        <div class="day__all-Desk">
          <div class="day__desk">
            <div class="lesson__start-Desk"></div>
            <div class="day__row-Desk">
              <div class="day__name">Понеділок</div>
            </div>
            <div class="day__row-Desk">
              <div class="day__name">Вівторок</div>
            </div>
            <div class="day__row-Desk">
              <div class="day__name">Середа</div>
            </div>
            <div class="day__row-Desk">
              <div class="day__name">Четвер</div>
            </div>
            <div class="day__row-Desk">
              <div class="day__name">П’ятниця</div>
            </div>
            <div class="day__row-Desk">
              <div class="day__name">Субота</div>
            </div>
          </div>

          <div
            class="day__desk"
            v-for="(lessonStart, indexLessonStart) in lessons"
            :key="indexLessonStart"
          >
            <div class="lesson__start-Desk">
              {{ indexLessonStart }} <br />{{ lessonStart.start }}
            </div>

            <div
              class="day__row-Desk"
              style="color: grey"
              v-for="(day, indexDay) in item.days"
              :key="indexDay"
            >
              <div
                v-for="(lessonCheck, indexCheck) in day.lessons"
                :key="indexCheck"
              >
                <div
                  class="lesson__info-Desk"
                  v-if="lessonCheck.lesson_number == indexLessonStart"
                >
                  <div class="lesson__name-Desk">{{lessonCheck.lesson_name}}</div> 
                  <div>{{ lessonCheck.teacher_name }} </div> 
                  <div>{{ lessonCheck.lesson_room }} {{ lessonCheck.lesson_type }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="table__mob" v-show="isTM" v-if="isTableVis">
      <div class="week" v-for="(item, index) in lessonsKpi.weeks" :key="index">
        <div class="week__number">{{ item.week_number }} Week</div>
        <div class="day__all">
          <div class="day" v-for="(day, index) in item.days" :key="index">
            <div class="day__name">
              {{ day.day_name }} {{ item.week_number }}
            </div>

            <div
              class="day__info"
              v-for="(lesson, indexLesson) in lessons"
              :key="indexLesson"
            >
              <tr class="day__row">
                <td class="lesson__start">
                  {{ indexLesson }} <br />
                  {{ lesson.start }}
                </td>

                <td
                  v-for="(lessonCheck, indexCheck) in day.lessons"
                  :key="indexCheck"
                >
                  <div
                    class="lesson__info"
                    v-if="lessonCheck.lesson_number == indexLesson"
                  >
                    <div class="lesson__name">{{
                      lessonCheck.lesson_name
                    }}</div>
                    <div>{{ lessonCheck.teacher_name }} </div>
                    <div
                      >{{ lessonCheck.lesson_room }}
                      {{ lessonCheck.lesson_type }}</div
                    >
                  </div>
                </td>
              </tr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cheerio from "cheerio";
import { mapActions, mapGetters } from "vuex";

import SearchGroup from "./vSearchGroup" //be carefull!!!

export default {
  name: "MainSessionLesson",
  data() {
    return {
      isTD: false,
      isTM: false,
      isTableVis: false,
      loading: false,
      isAlertVis: false,
      lessons: {
        1: { start: "8:30" },
        2: { start: "10:25" },
        3: { start: "12:20" },
        4: { start: "14:15" },
        5: { start: "16:10" },
        6: { start: "18:30" },
      },
      lessonsKpi: {
      },
    };
  },
  components: {
    SearchGroup,
  },
  methods: {
    getSession() {
      let vm = this;
      this.loading = true;
      if (this.RETURN_GROUP_NAME == 0 || this.RETURN_GROUP_NAME == null) {
        this.isAlertVis = true;
      } else {
        this.isAlertVis = false;
        let url =
          "http://api.rozklad.org.ua/v2/groups/" +
          this.RETURN_GROUP_NAME +
          "/timetable";

        //let url = "https://api.rozklad.org.ua/v2/groups/511/timetable";

        return axios(url, {
          method: "GET",
        })
          .then((response) => {
            this.isTableVis = true;
            console.log("isTableVis = true");
            this.lessonsKpi = response.data.data;

            if (this.lessonsKpi != null) {
              this.loading = false;
            }
          })
          .catch((error) => console.log("ERROR"));
      }
      if (this.lessonsKpi != null) {
        this.lessonsKpi == null;
        this.loading = false;
        console.log("array is empty");
      }
    },
  },
  computed: {
    ...mapGetters(["RETURN_GROUP_NAME"]),
  },
  mounted() {
    console.log(document.body.clientWidth);
    let vm = this;

    if (document.body.clientWidth >= 1024) {
      this.isTD = true;
    } else if (document.body.clientWidth <= 1024) {
      this.isTM = true;
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Langar&display=swap");


$border-color: rgb(165, 165, 165);



#table__desktop {
  min-width: 838px;
 
}
.day__all-Desk {
  margin: 50px;
}
.day__desk {
  display: flex;
  flex-direction: row;
  width: 100%;
  border-left: 1px solid $border-color;
  border-right: 1px solid $border-color;
  &:first-child {
    border-top: 1px solid $border-color;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    & .lesson__start-Desk {
      border-top: 0px solid $border-color;
    }
    & .day__row-Desk {
      border-top: 0px solid $border-color;
    }
  }
  &:last-child {
    border-bottom: 1px solid $border-color;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}
.day__row-Desk {
  min-width: 110px;
  width: 100%;
  border-top: 1px solid $border-color;
  border-right: 1px solid $border-color;

  &:last-child {
    border-right: 0px solid $border-color;
  }
}
.lesson__start-Desk {
  padding: 5px;
  min-width: 60px;
  max-width: 60px;
  border-top: 1px solid $border-color;
  border-right: 1px solid $border-color;
}
.lesson__name-Desk{
  text-align: left;
  color: black;
  font-size: 17px;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 20px;
  background-color: rgb(231, 231, 231);

  @media screen and (max-width: 1250px) {
    word-break: break-all;
  }
  
}
.lesson__info-Desk {
  padding: 10px;
}


#table__mob{
}
.week__number {
  text-align: center;
  font-size: 24px;
  padding: 20px;
}
.day {
  margin: 0 50px;
  border-left: 1px solid $border-color;
  border-right: 1px solid $border-color;
  border-bottom: 1px solid $border-color;

  &:last-child {
    border-bottom: 1px solid $border-color;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  &:first-child {
    border-top: 1px solid $border-color;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
}
.day__name {
  padding: 10px 10px;
  text-align: left;
  font-size: 20px;
  font-weight: 700;

  @media screen and (min-width: 1024px) {
    margin: 0 auto;
    text-align: center;
  }
}
.day__info {
  display: flex;
  flex-direction: column;
  border-top: 1px solid $border-color;
}
.day__row {
  display: flex;
}
.lesson__start {
  min-width: 60px;
  padding: 5px;
  border-right: 1px solid$border-color;
}
.lesson__info {
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.lesson__name {
  padding: 2px 10px;
  margin: 0;
  text-align: left;
  border-radius: 20px;
  background-color: rgb(231, 231, 231);
  font-size: 20px;
}
.getSession {
  font-size: 16px;
  
}
</style>