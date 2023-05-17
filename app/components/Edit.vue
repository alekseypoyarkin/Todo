<template>
    <Page>
        <ActionBar>
            <NavigationButton text="Go back"
                android.systemIcon="ic_menu_back"
                @tap="backHome" />
            <Label text="Добавление задачи" />
        </ActionBar>
        <FlexboxLayout flexDirection="column">
            <label text="Название задачи: " />
            <TextView v-model="title"
                editable="true" />
            <label text="Описание задачи: " />
            <TextView v-model="description"
                editable="true" />
            <button text="Сохранить изменения"
                @tap="edit" />
            <button text="Удалить"
                @tap="del" />
        </FlexboxLayout>
    </Page>
</template>
  
<script>
import * as ApplicationSettings from "@nativescript/core/application-settings";
import Home from "./Home.vue";
export default {
    props: ['id'],
    data() {
        return {
            listTasks: [],
            selectedTask: [],
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
        del() {
            let newListTasks = [];
            this.listTasks.forEach(item => {
                if (item.id != this.id) {
                    newListTasks.push({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        date: item.date,
                        done: item.done,
                    });
                }
            });
            this.listTasks = newListTasks;
            this.save();
        },
        edit() {
            this.listTasks.forEach(item => {
                if (item.id == this.id) {
                    if (this.title != "" || this.title.length != 0) {
                        item.title = this.title;
                    }
                    if (this.description != "" || this.description.length != 0) {
                        this.description == item.description;
                    }
                    item.description = this.description;
                }
            });
            this.save();
        },
    },
    mounted() {
        if (ApplicationSettings.getString("tasks")) {
            this.listTasks = Object.values(JSON.parse(ApplicationSettings.getString("tasks")));
        }
        this.listTasks.forEach(task => { 
            if(task.id == this.id){
                this.selectedTask = task;
            }
        });
        this.title = this.selectedTask.title;
        this.description = this.selectedTask.description;
    },
}
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
  