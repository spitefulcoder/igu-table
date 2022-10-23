<template>
  <Modal
    v-show="isShowModal"
    @close="closeModal"
  >
    <template v-slot:content>
      <div class="add-student-form">
        <div class="add-student-form__head">
          <div class="add-student-form__title">
            Добавить студента  {{currentStep}}/{{stepsCount}}
          </div>
          <img 
            src="../assets/cross-icon.svg" 
            alt="close"
            class="add-student-form__close-button"
            @click="closeModal"
          >
        </div>
        <div class="add-student-form__body">
          <div 
            class="add-student-form__step1 step1-form"
            v-if="currentStep === 1"
          >
            <FormInput 
              label="ФИО:"
              container-class="step1-form__fio"
            />
            <FormInput 
              label="Курс:"
              view-type="select"
              :options="$options.coursesOptions"
              placeholder="Курс"
              container-class="step1-form__course"
            />
            <FormInput 
              label="Группа:"
              view-type="select"
              :options="$options.groupsOptions"
              placeholder="Группа"
              container-class="step1-form__studentsGroup"
            />
            <FormInput 
              label="Дата рождения:"
              container-class="step1-form__birthday"
            />
            <FormInput 
              label="Группа здоровья:"
              view-type="select"
              :options="$options.medGroupsOptions"
              placeholder="Группа здоровья"
              container-class="step1-form__medGroup"
            />
            <FormInput 
              label="Факультет:"
              view-type="select"
              :options="$options.facultyOptions"
              placeholder="Факультет"
              container-class="step1-form__faculty"
            />
          </div>
          <div 
            class="add-student-form__step2 step2-form"
            v-else-if="currentStep === 2"
          >
            
          </div>
        </div>
        <div class="add-student-form__footer">
          <FormButton>
            <template>
              Далее
            </template>
          </FormButton>
        </div>
      </div>
    </template>
  </Modal>
</template>
  
<script>
import Modal from "./Modal.vue";
import FormButton from "./FormButton.vue";
import FormInput from "./inputs/FormInput.vue";
import { courses, medGroups, studentsGroups, faculty } from "../constants/selects-options/selects-options";


export default {
  
  coursesOptions: courses,
  groupsOptions: studentsGroups,
  medGroupsOptions: medGroups,
  facultyOptions: faculty,

  components: {
    Modal,
    FormButton,
    FormInput
  },

  props: {
    isShowModal: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return { 
      currentStep: 1,
      stepsCount: 3
    };
  },

  methods: {
    closeModal() {
      this.$emit("close")
    }
  }
};
</script>

<style lang="scss" scoped>
  .add-student-form {
    display: flex;
    flex-direction: column;
    background-color: #2A2E96;
    padding: 50px 80px;
    min-width: 900px;
    width: 65%;
    height: 750px;
    border-radius: 50px;

    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__title {
      font-weight: 700;
      font-size: 48px;
      line-height: 59px;
      color: #FFFFFF;
    }

    &__body {
      flex: 1;
    }

    &__step1 {
        
    }

    &__close-button {
      cursor: pointer;
    }
  }

  .step1-form {
    display: grid;
    grid-template-areas: 
      "fio fio course studentsGroup"
      "birthday birthday medGroup medGroup"
      "faculty faculty . .";
    grid-column-gap: 24px;
    grid-row-gap: 24px;

    &__fio {
      grid-area: fio;
    }

    &__course {
      grid-area: course;
    }

    &__studentsGroup {
      grid-area: studentsGroup;
    }
    
    &__birthday {
      grid-area: birthday;
    }

    &__medGroup {
      grid-area: medGroup;
    }

    &__faculty {
      grid-area: faculty;
    }

  }
</style>