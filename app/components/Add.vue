<template>
  <Page>
    <ActionBar>
      <NavigationButton
        text="Go back"
        android.systemIcon="ic_menu_back"
        @tap="backHome"
      />
      <Label text="Добавление задачи" />
    </ActionBar>
    <FlexboxLayout flexDirection="column">
      <label text="Название задачи: " />
      <TextView v-model="title" editable="true" />
      <label text="Описание задачи: " />
      <TextView v-model="description" editable="true" />
      <button text="Добавить" @tap="add" />
    </FlexboxLayout>
  </Page>
</template>

<script>
import * as ApplicationSettings from "@nativescript/core/application-settings";
import Home from "./Home.vue";
export default {
  data() {
    return {
      listTasks: [],
      title: "",
      description: "",
    };
  },
  methods: {
    backHome() {
      this.$navigateBack();
    },
    toHome() {
      this.$navigateTo(Home);
    },
    save() {
      let listSave = Object.assign({}, this.listTasks);
      ApplicationSettings.setString("tasks", JSON.stringify(listSave));
      this.toHome();
    },
    add() {
      let currentDate = new Date();
      let month = currentDate.getMonth() + 1;
      month = month.toString();
      let day = currentDate.getDate().toString();
      let year = currentDate.getFullYear();

      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      let date = day + "." + month + "." + year;

      this.listTasks.push({
        id: Math.random(),
        title: this.title,
        description: this.description,
        date: date,
        done: false,
      });
      this.save();
    },
  },
  mounted() {
    if (ApplicationSettings.getString("tasks")) {
      this.listTasks = Object.values(JSON.parse(ApplicationSettings.getString("tasks")));
    }
  },
};
</script>

<style scoped lang="scss">
@import "@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
