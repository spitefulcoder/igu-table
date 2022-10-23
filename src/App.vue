<template>
  <div id="app">
    <div>
      <HeaderNav @change-tab="handleChangeTab" />
      <AddStudentForm
        :is-show-modal="isAddStudentModalOpen"
        @close="toggleStudentModal"
      />
      <b-button @click="toggleStudentModal"> Добавить </b-button>
      <v-select
        class="form-selector"
        :options="options.faculty"
        placeholder="Факультет"
        label="name"
      />
      <v-select
        class="form-selector"
        :options="options.course"
        placeholder="Курс"
        label="name"
      />
      <v-select
        class="form-selector"
        :options="options.group"
        placeholder="Группа"
        label="name"
      />
      <TheTable
        :items="students"
        :fields="tableColumns[tableName]"
        @update="updateStudent"
      />
    </div>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav.vue";
import TheTable from "./components/TheTable.vue";
import FormTextInput from "./components/inputs/FormTextInput.vue";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, onValue } from "firebase/database";
import { tableColumns } from "./constants/tables/table-columns";
import {
  faculty,
  courses,
  studentsGroups,
} from "./constants/selects-options/selects-options";
import AddStudentForm from "./components/AddStudentForm.vue";
import { firebaseConfig } from "./constants/firebase/firebase-config";
import { STUDENTS_FB_PATH } from "./constants/firebase/data-paths";

export default {
  components: {
    TheTable,
    HeaderNav,
    FormTextInput,
    AddStudentForm,
  },
  data() {
    return {
      options: {
        faculty: faculty,
        course: courses,
        group: studentsGroups,
      },
      isAddStudentModalOpen: false,
      students: [],
      database: null,
      tableColumns: tableColumns,
      tableName: "generalFields",
    };
  },

  mounted() {
    const app = initializeApp(firebaseConfig);

    this.database = getDatabase(app);

    const studentsRef = ref(this.database, STUDENTS_FB_PATH)
    onValue(studentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const studentsDataObj = snapshot.val()
        const sortedStudentsArray = Object.values(studentsDataObj).sort((a, b) => a.fullname < b.fullname ? -1 : 1)
        this.students = sortedStudentsArray
      }
      else {
        console.error("No data from db")
      }
    })
  },

  destroyed() {

  },
  
  methods: {
    toggleStudentModal() {
      this.isAddStudentModalOpen = !this.isAddStudentModalOpen;
    },

    updateStudent(data) {
      const result = data.item;

      result[data.field.key] = data.value;

      const updates = {};
      updates[`/${STUDENTS_FB_PATH}/${data.item.id}`] = result;
      return update(ref(this.database), updates);
    },

    handleChangeTab(val) {
      this.tableName = val;
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Helvetica Now Display";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
}
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
.form-selector {
  margin-right: 25px;
  width: 280px;
}
</style>
