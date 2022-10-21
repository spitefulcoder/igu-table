<template>
  <div>
    <b-button @click="modalShow = !modalShow">Добавить</b-button>

    <b-modal hide-footer size="xl" v-model="modalShow">
      <b-tabs content-class="mt-3">
        <b-tab title="Общая информация" active>
          <FormMember :items="generalItems" />
        </b-tab>
        <b-tab title="Физическое развитие"
          ><FormMember :items="generalItems" />
        </b-tab>
        <b-tab title="Физ. подготовленность">
          <FormMember :items="generalItems"
        /></b-tab>
      </b-tabs>
    </b-modal>
  </div>
</template>

<script>
import FormMember from "./FormMember.vue";
export default {
  components: {
    FormMember,
  },

  data() {
    return {
      modalShow: false,
      generalItems: [
        { value: "", placeholder: "Фамилия Имя Отчество", key: "fullname" },
        { value: "", placeholder: "Дата рождения", key: "dateOfBirth" },
        { value: "", placeholder: "Курс", key: "course" },
        { value: "", placeholder: "Факультет", key: "faculty" },
        { value: "", placeholder: "Группа", key: "group" },
        { value: "", placeholder: "Группа здоровья", key: "healthGroup" },
      ],
      physicalItems: [{ value: "", placeholder: "Рост", key: "fullname" }],
      standardsItems: [],
    };
  },
};
</script>

<style></style>
