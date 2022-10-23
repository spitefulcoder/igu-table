<template>
  <div class="wrapper">
    <header class="header">
      <HeaderNav @change-tab="handleChangeTab" />
      <div class="add-button" @click="toggleStudentModal">
        <img
          class="add-button__image"
          src="../assets/add-student-btn.svg"
          alt="Добавить"
        />
        <span class="add-button__text">Добавить студента</span>
      </div>
    </header>
    <AddStudentForm
      :is-show-modal="isAddStudentModalOpen"
      @close="toggleStudentModal"
    />
    <div class="filters">
      <v-select
        class="form-selector form-selector__faculty"
        :options="options.faculty"
        placeholder="Факультет"
        label="name"
      />
      <v-select
        class="form-selector form-selector__course"
        :options="options.course"
        placeholder="Курс"
        label="name"
      />
      <v-select
        class="form-selector form-selector__group"
        :options="options.group"
        placeholder="Группа"
        label="name"
      />
    </div>
    <TheTable
      :items="students"
      :fields="tableColumns[tableName]"
      @update="updateStudent"
      @delete="deleteStudent"
    />
  </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav.vue";
import TheTable from "../components/TheTable.vue";
import FormTextInput from "../components/inputs/FormTextInput.vue";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  onValue,
  remove,
} from "firebase/database";
import { tableColumns } from "../constants/tables/table-columns";
import {
  faculty,
  courses,
  studentsGroups,
} from "../constants/selects-options/selects-options";
import AddStudentForm from "../components/AddStudentForm.vue";
import { firebaseConfig } from "../constants/firebase/firebase-config";
import { STUDENTS_FB_PATH } from "../constants/firebase/data-paths";

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
    document.body.style.background = "white";
    const app = initializeApp(firebaseConfig);

    this.database = getDatabase(app);

    const studentsRef = ref(this.database, STUDENTS_FB_PATH);
    onValue(studentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const studentsDataObj = snapshot.val();
        const sortedStudentsArray = Object.values(studentsDataObj).sort(
          (a, b) => (a.fullname < b.fullname ? -1 : 1)
        );
        this.students = sortedStudentsArray;
      } else {
        this.students = [];
      }
    });
  },

  destroyed() {},

  methods: {
    toggleStudentModal() {
      this.isAddStudentModalOpen = !this.isAddStudentModalOpen;
    },

    deleteStudent(data) {
      return update(ref(this.database), {
        [`/${STUDENTS_FB_PATH}/${data.item.id}`]: null,
      });
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

<style lang="scss" scoped>
.wrapper {
  width: 1140px;
}
* {
  font-family: "Helvetica Now Display";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
}
header {
  line-height: 1.5;
  display: flex;
  margin-bottom: 70px;
}

.filters {
  display: flex;
  margin-bottom: 56px;
  height: 64px;
}

.add-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: auto;
  order: -1;
  &__image {
    width: 25px;
    height: 25px;
  }
  &__text {
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 18px;
  }
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
  height: 64px;
  margin-right: 25px;
  &__faculty {
    width: 363px;
  }
  &__course {
    width: 267px;
  }
  &__group {
    width: 267px;
  }
}

::v-deep .form-selector .vs__search::placeholder,
::v-deep .form-selector .vs__dropdown-toggle {
  background: #ecf0ff;
  padding: 14px 22px;
  border-radius: 50px;
  border: none;
  height: 64px;
  color: #000 !important;
  font-weight: 400 !important;
  font-size: 24px !important;
  line-height: 35px !important;
  margin: 0 !important;
  border: none !important;
}

::v-deep .form-selector .vs__selected {
  height: 64px;
  margin: -13px;
}

::v-deep .vs--open .vs__dropdown-toggle {
  height: 64px;
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

::v-deep .form-selector .vs__dropdown {
  height: 64px;
  font-style: normal;
  color: #000;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  &-menu {
    background: #dfe6ff;
    color: #000;
    border: none;
    border-radius: 0 0 32px 32px;
  }
  &-option:hover {
    background: #2a2e96;
    border-radius: 32px;
  }
  &-option--highlight {
    background: #2a2e96;
    border-radius: 32px;
  }
}
</style>
