<template>
  <div id="app">
    <div>
      <AddStudentForm 
        :is-show-modal="isAddStudentModalOpen"
        @close="toggleStudentModal"
      />
      <b-button 
        @click="toggleStudentModal"
      >
        Добавить
      </b-button>
      <b-tabs no-fade justified content-class="mt-3">
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
        <b-tab title="Общая информация" active>
          <TheTable
            :items="students"
            :fields="tableColumns.generalFields"
            @update="updateStudent"
          />
        </b-tab>
        <b-tab title="Физическое развитие">
          <TheTable
            :items="students"
            :fields="tableColumns.physicalFields"
            @update="updateStudent"
          />
        </b-tab>
        <b-tab title="Физ. подготовленность">
          <TheTable
            :items="students"
            :fields="tableColumns.standardsFields"
            @update="updateStudent"
          />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import TheTable from "./components/TheTable.vue";
import AddMember from "./components/AddMember.vue";
import FormTextInput from './components/inputs/FormTextInput.vue'
import { nanoid } from "nanoid";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  push,
  child,
} from "firebase/database";
import { tableColumns } from "./constants/tables/table-columns";
import { faculty, courses, studentsGroups } from "./constants/selects-options/selects-options"
import AddStudentForm from "./components/AddStudentForm.vue";

export default {
  components: {
    TheTable,
    AddMember,
    FormTextInput,
    AddStudentForm
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
      tableColumns: tableColumns
    };
  },

  mounted() {
    const firebaseConfig = {
      databaseURL: "https://isu-pe-students-default-rtdb.europe-west1.firebasedatabase.app/",
    };

    const app = initializeApp(firebaseConfig);

    this.database = getDatabase(app);

    // this.uploadNewStudent();
    this.fetchStudents();
  },

  methods: {

    toggleStudentModal() {
      this.isAddStudentModalOpen = !this.isAddStudentModalOpen
    },

    fetchStudents() {
      get(ref(this.database), `students/`)
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.students = Object.values(snapshot.val())[0];
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    uploadNewStudent() {
      set(ref(this.database, "stundets/" + 0), {
        id: nanoid(),
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
      updates["/students/" + 0] = result;
      console.log(updates);
      // updates["/students/" + data.index].data.field.key = data.value;
      // set(ref(this.database, "students/", userId), {});
      return update(ref(this.database), updates);
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
