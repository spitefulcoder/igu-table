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
import { nanoid } from "nanoid";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update } from "firebase/database";
import { tableColumns } from "./constants/tables/table-columns";
import {
  faculty,
  courses,
  studentsGroups,
} from "./constants/selects-options/selects-options";
import AddStudentForm from "./components/AddStudentForm.vue";

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
    const firebaseConfig = {
      databaseURL:
        "https://table-995e2-default-rtdb.europe-west1.firebasedatabase.app/",
    };

    const app = initializeApp(firebaseConfig);

    this.database = getDatabase(app);

    // this.uploadNewStudent();
    this.fetchStudents();
  },

  methods: {
    toggleStudentModal() {
      this.isAddStudentModalOpen = !this.isAddStudentModalOpen;
    },

    fetchStudents() {
      get(ref(this.database), `students/`)
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            this.students = Object.values(Object.values(snapshot.val())[0]);
            console.log(this.students);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    uploadNewStudent() {
      const nextStudentId = nanoid();
      set(ref(this.database, `students/${nextStudentId}`), {
        id: nextStudentId,
        fullname: "Афанасьев Геогргий Викторович",
        faculty: "Управление персоналом",
        group: "Н332-ДБ",
        course: 3,
        isActive: false,
        healthGroup: 1,
        dateOfBirth: "15.05.1999",
        height: 168,
        weight: 55,
        heartRate: 82,
        bloodPressure: {
          max: 120,
          min: 70,
        },
        dynamometer: {
          right: 20,
          left: 20,
        },
        running: 100,
        throwing: 5,
        boat: 30,
        squats: 12,
        pullUps: 10,
        pushUps: 12,
      });
    },

    updateStudent(data) {
      const result = data.item;

      result[data.field.key] = data.value;

      const updates = {};
      updates["/students/" + data.item.id] = result;
      console.log(updates);
      // updates["/students/" + data.index].data.field.key = data.value;
      // set(ref(this.database, "students/", userId), {});
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
