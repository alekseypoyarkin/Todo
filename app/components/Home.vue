<template>
  <Page>
    <ActionBar>
      <GridLayout colums="9*, *">
        <Label text="ToDo" col="0" />
        <button text="Добавить задачу" col="1" @tap="add" backgroundColor="#808080" />
      </GridLayout>
    </ActionBar>

    <TabView>
      <TabViewItem title="Все дела">
        <ScrollView>
          <FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
            <template v-if="listTasks.length == 0">
              <FlexboxLayout flexDirection="column" class="item-hollow">
                <label class="title-task" text="Список задач пуст!" />
                <label
                  class="description-task"
                  text="Используйте кнопку сверху чтобы добавить"
                />
              </FlexboxLayout>
            </template>
            <template v-for="(task, key) in listTasks.slice().reverse()">
              <template>
                <GridLayout
                  columns="3*, 2*, *"
                  rows="*"
                  backgroundColor="#FFDB58"
                  class="task"
                  :key="key"
                >
                  <Label
                    :text="task.title"
                    row="0"
                    col="0"
                    backgroundColor="#43b883"
                    class="task-content"
                  />
                  <template v-if="!task.done">
                    <Button
                      text="Завершить"
                      row="0"
                      col="1"
                      backgroundColor="#1c6b48"
                      @tap="done(task.id)"
                    />
                    <Button
                      text="Редактировать"
                      row="0"
                      col="2"
                      backgroundColor="#000000"
                      @tap="edit(task.id)"
                    />
                  </template>
                  <template v-else>
                    <label text="Завершено!" row="0" col="1" class="task-done" />
                    <Button
                      text="Редактировать"
                      row="0"
                      col="2"
                      backgroundColor="#000000"
                      @tap="edit(task.id)"
                    />
                  </template>
                </GridLayout>
              </template>
            </template>
          </FlexboxLayout>
        </ScrollView>
      </TabViewItem>
      <TabViewItem title="В процессе">
        <ScrollView>
          <FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
            <template v-for="(task, key) in listTasks.slice().reverse()">
              <template v-if="!task.done">
                <GridLayout
                  columns="3*, 2*, *"
                  rows="*"
                  backgroundColor="#FFDB58"
                  class="task"
                  :key="key"
                >
                  <Label
                    :text="task.title"
                    row="0"
                    col="0"
                    backgroundColor="#43b883"
                    class="task-content"
                  />
                  <Button
                    text="Завершить"
                    row="0"
                    col="1"
                    backgroundColor="#1c6b48"
                    @tap="done(task.id)"
                  />
                  <Button
                    text="Редактировать"
                    row="0"
                    col="2"
                    backgroundColor="#000000"
                    @tap="edit(task.id)"
                  />
                </GridLayout>
              </template>
            </template>
          </FlexboxLayout>
        </ScrollView>
      </TabViewItem>
      <TabViewItem title="Завершённые">
        <ScrollView>
          <FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
            <template v-for="(task, key) in listTasks.slice().reverse()">
              <template v-if="task.done">
                <GridLayout
                  columns="3*, 2*, *"
                  rows="*"
                  backgroundColor="#FFDB58"
                  class="task"
                  :key="key"
                >
                  <Label
                    :text="task.title"
                    row="0"
                    col="0"
                    backgroundColor="#43b883"
                    class="task-content"
                  />
                  <label text="Завершено!" row="0" col="1" class="task-done" />
                  <Button
                    text="Редактировать"
                    row="0"
                    col="2"
                    backgroundColor="#000000"
                    @tap="edit(task.id)"
                  />
                </GridLayout>
              </template>
            </template>
          </FlexboxLayout>
        </ScrollView>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import Add from "./Add.vue";
import Home from "./Home.vue";
import Edit from "./Edit.vue";
import * as ApplicationSettings from "@nativescript/core/application-settings";
export default {
  data() {
    return {
      listTasks: [],
    };
  },
  mounted() {
    if (ApplicationSettings.getString("tasks")) {
      this.listTasks = Object.values(JSON.parse(ApplicationSettings.getString("tasks")));
    }
  },
  methods: {
    update() {
      this.$navigateTo(Home);
    },
    add() {
      this.$navigateTo(Add);
    },
    save() {
      let listSave = Object.assign({}, this.listTasks);
      ApplicationSettings.setString("tasks", JSON.stringify(listSave));
      this.update();
    },
    done(id) {
      this.listTasks.forEach((item) => {
        if (item.id == id) {
          item.done = true;
        }
      });
      this.save();
    },
    edit(id) {
      this.$navigateTo(Edit, { props: { id: id } });
    },
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
