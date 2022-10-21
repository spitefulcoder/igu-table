<template>
  <div id="app">
    <div>
      <AddMember />
      <b-tabs no-fade justified content-class="mt-3">
        <b-form-select class="form-selector" :options="options.faculty" />
        <b-form-select class="form-selector" :options="options.course" />
        <b-form-select class="form-selector" :options="options.group" />
        <b-tab title="Общая информация" active>
          <TheTable
            :items="students"
            :fields="generalFields"
            @update="updateStudent"
          />
        </b-tab>
        <b-tab title="Физическое развитие">
          <TheTable
            :items="students"
            :fields="physicalFields"
            @update="updateStudent"
          />
        </b-tab>
        <b-tab title="Физ. подготовленность">
          <TheTable
            :items="students"
            :fields="standardsFields"
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

export default {
  components: {
    TheTable,
    AddMember,
  },
  data() {
    return {
      options: {
        faculty: [
          "Прикладная ифнорматика",
          "Сервис",
          "Туризм",
          "Реклама и связи с общественностью",
          "Управление персоналом",
        ],
        course: [1, 2, 3, 4],
        group: ["ЦБ", "ФБ", "Н332-ДБ"],
      },
      students: [],
      database: null,
      generalFields: [
        {
          key: "fullname",
          label: "Фамилия Имя Отчество",
          editable: true,
        },
        {
          key: "dateOfBirth",
          label: "Дата рождения",
          editable: true,
        },
        {
          key: "course",
          label: "Курс",
          editable: true,
        },
        {
          key: "faculty",
          label: "Факультет",
          editable: true,
        },
        {
          key: "group",
          label: "Группа",
          editable: true,
        },
        {
          key: "healthGroup",
          label: "Группа здоровья",
          editable: true,
        },
      ],
      physicalFields: [
        {
          key: "fullname",
          label: "Фамилия Имя Отчество",
          editable: true,
        },
        {
          key: "height",
          label: "Рост (см)",
          editable: true,
        },
        {
          key: "weight",
          label: "Вес (кг)",
          editable: true,
        },
        {
          key: "heartRate",
          label: "ЧСС в покое",
          editable: true,
        },
        {
          key: "bloodPressure",
          label: "АД в покое",
          editable: true,
        },
        {
          key: "dynamometer",
          label: "ДИНАМОМ правая/левая",
          editable: true,
        },
      ],
      standardsFields: [
        {
          key: "fullname",
          label: "Фамилия Имя Отчество",
          editable: true,
        },
        {
          key: "running",
          label: "Бег (с)",
          editable: true,
        },
        {
          key: "throwing",
          label: "Метание (см)",
          editable: true,
        },
        {
          key: "boat",
          label: "Лодочка (с)",
          editable: true,
        },
        {
          key: "squats",
          label: "Приседания",
          editable: true,
        },
        {
          key: "pullUps",
          label: "Подтягивания",
          editable: true,
        },
        {
          key: "pushUps",
          label: "Отжимания",
          editable: true,
        },
      ],
    };
  },

  mounted() {
    const firebaseConfig = {
      // ...
      // The value of `databaseURL` depends on the location of the database
      databaseURL:
        "https://table-995e2-default-rtdb.europe-west1.firebasedatabase.app/",
    };

    const app = initializeApp(firebaseConfig);

    this.database = getDatabase(app);

    // this.uploadNewStudent();
    this.fetchStudents();
  },

  methods: {
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
