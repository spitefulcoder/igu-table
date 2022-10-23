<template>
  <Modal v-show="isShowModal" @close="closeModal">
    <template v-slot:content>
      <div class="add-student-form">
        <div class="add-student-form__head">
          <div class="add-student-form__head-left">
            <div
              class="add-student-form__title"
              v-if="currentStep <= lastFormStep"
            >
              Добавить студента {{ currentStep }}/{{ lastFormStep }}
            </div>
          </div>
          <img
            src="../assets/cross-icon.svg"
            alt="close"
            class="add-student-form__close-button"
            @click="closeModal"
          />
        </div>
        <div class="add-student-form__body">
          <div
            class="add-student-form__step1 add-student-form__step-form step1-form"
            v-if="currentStep === 1"
          >
            <FormInput
              label="ФИО:"
              :value="nextStudentData.fullname"
              @input="onInput($event, 'fullname', 'text')"
              placeholder="Иванов Иван Иванович"
              container-class="step1-form__fio"
            />
            <FormInput
              label="Курс:"
              view-type="select"
              :options="$options.coursesOptions"
              :value="nextStudentData.course"
              @input="onInput($event, 'course', 'select')"
              placeholder="Курс"
              container-class="step1-form__course"
            />
            <FormInput
              label="Группа:"
              view-type="select"
              :options="$options.groupsOptions"
              :value="nextStudentData.group"
              @input="onInput($event, 'group', 'select')"
              placeholder="Группа"
              container-class="step1-form__studentsGroup"
            />
            <FormInput
              label="Дата рождения:"
              :value="nextStudentData.dateOfBirth"
              placeholder="01.01.2000"
              @input="onInput($event, 'dateOfBirth', 'text')"
              container-class="step1-form__birthday"
            />
            <FormInput
              label="Группа здоровья:"
              view-type="select"
              :options="$options.medGroupsOptions"
              :value="nextStudentData.healthGroup"
              @input="onInput($event, 'healthGroup', 'select')"
              placeholder="Группа здоровья"
              container-class="step1-form__medGroup"
            />
            <FormInput
              label="Факультет:"
              view-type="select"
              :options="$options.facultyOptions"
              :value="nextStudentData.faculty"
              @input="onInput($event, 'faculty', 'select')"
              placeholder="Факультет"
              container-class="step1-form__faculty"
            />
          </div>
          <div
            class="add-student-form__step2 add-student-form__step-form step2-form"
            v-else-if="currentStep === 2"
          >
            <FormInput
              label="Рост (см):"
              container-class="step2-form__height"
              :value="nextStudentData.height"
              placeholder="0"
              @input="onInput($event, 'height', 'text')"
            />
            <FormInput
              label="Вес (кг):"
              container-class="step2-form__weight"
              :value="nextStudentData.weight"
              placeholder="0"
              @input="onInput($event, 'weight', 'text')"
            />
            <FormInput
              label="ЧСС:"
              container-class="step2-form__heart-rate"
              :value="nextStudentData.heartRate"
              placeholder="0"
              @input="onInput($event, 'heartRate', 'text')"
            />
            <FormDoubleTextInput
              label="Давление:"
              container-class="step2-form__blood-pressure"
              :value1="nextStudentData.bloodPressureMax"
              @input1="onInput($event, 'bloodPressureMax', 'text')"
              placeholder1="0"
              :value2="nextStudentData.bloodPressureMin"
              @input2="onInput($event, 'bloodPressureMin', 'text')"
              placeholder2="0"
            />
            <FormDoubleTextInput
              label="Динамометр пр/лв:"
              container-class="step2-form__dynamometer"
              :value1="nextStudentData.dynamometerRight"
              @input1="onInput($event, 'dynamometerRight', 'text')"
              placeholder1="0"
              :value2="nextStudentData.dynamometerLeft"
              @input2="onInput($event, 'dynamometerLeft', 'text')"
              placeholder2="0"
            />
          </div>
          <div
            class="add-student-form__step3 add-student-form__step-form step3-form"
            v-else-if="currentStep === 3"
          >
            <FormInput
              label="Приседания:"
              container-class="step3-form__squats"
              :value="nextStudentData.squats"
              placeholder="0"
              @input="onInput($event, 'squats', 'text')"
            />
            <FormInput
              label="Бег(с):"
              container-class="step3-form__running"
              :value="nextStudentData.running"
              placeholder="0"
              @input="onInput($event, 'running', 'text')"
            />
            <FormInput
              label="Лодочка(с):"
              container-class="step3-form__boat"
              :value="nextStudentData.boat"
              placeholder="0"
              @input="onInput($event, 'boat', 'text')"
            />
            <FormInput
              label="Отжимания:"
              container-class="step3-form__push-ups"
              :value="nextStudentData.pushUps"
              placeholder="0"
              @input="onInput($event, 'pushUps', 'text')"
            />
            <FormInput
              label="Подтягивания:"
              container-class="step3-form__pull-ups"
              :value="nextStudentData.pullUps"
              placeholder="0"
              @input="onInput($event, 'pullUps', 'text')"
            />
          </div>
          <div
            class="add-student-form__added-successfully"
            v-else-if="currentStep === 4"
          >
            <div class="add-student-form__added-successfully-text">
              Студент добавлен в базу!
            </div>
          </div>
        </div>
        <div class="add-student-form__footer">
          <FormButton
            v-if="currentStep > 1 && currentStep <= 3"
            container-class="add-student-form__action-button"
            @click="prevButtonClick"
          >
            <template> Назад </template>
          </FormButton>
          <FormButton
            container-class="add-student-form__action-button"
            @click="nextButtonClick"
            v-if="currentStep < lastFormStep"
          >
            <template> Далее </template>
          </FormButton>
          <FormButton
            @click="addStudentToDB"
            v-else-if="currentStep === lastFormStep"
          >
            <template> Добавить </template>
          </FormButton>
          <FormButton @click="closeModal" v-else-if="currentStep === 4">
            <template> ОК </template>
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
import {
  courses,
  medGroups,
  studentsGroups,
  faculty,
} from "../constants/selects-options/selects-options";
import FormDoubleTextInput from "./inputs/FormDoubleTextInput.vue";
import { nanoid } from "nanoid";
import { getDatabase, ref, set } from "@firebase/database";
import { EMPTY_STUDENT_DATA } from "../constants/students/empty-student";
import { STUDENTS_FB_PATH } from "../constants/firebase/data-paths";

export default {
  coursesOptions: courses,
  groupsOptions: studentsGroups,
  medGroupsOptions: medGroups,
  facultyOptions: faculty,

  components: {
    Modal,
    FormButton,
    FormInput,
    FormDoubleTextInput,
  },

  props: {
    isShowModal: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentStep: 1, // первые шаги - форма, далее экран "Успешно добавлен"
      lastFormStep: 3,
      emptyStudent: EMPTY_STUDENT_DATA,
      nextStudentData: {
        fullname: "",
        faculty: null, // селект
        group: null, // селект
        course: null, // селект
        healthGroup: null, // селект
        dateOfBirth: "",
        height: "",
        weight: "",
        heartRate: "",
        bloodPressureMax: "",
        bloodPressureMin: "",
        dynamometerRight: "",
        dynamometerLeft: "",
        running: "",
        throwing: "",
        boat: "",
        squats: "",
        pullUps: "",
        pushUps: "",
      },
    };
  },

  methods: {
    closeModal() {
      this.nextStudentData = { ...this.emptyStudent };
      this.currentStep = 1;
      this.$emit("close");
    },

    prevButtonClick() {
      this.currentStep -= 1;
    },

    nextButtonClick() {
      if (this.currentStep < this.lastFormStep) {
        this.currentStep += 1;
      }
    },

    /**
     *
     * @param {object | string} nextValue
     * @param {string} fieldKey
     * @param {'text' | 'select'} inputType
     */
    onInput(nextValue, fieldKey, inputType) {
      if (fieldKey.includes(".")) {
        const fieldKeys = fieldKey.split(".");
        let targetObject = this.nextStudentData;
        //получаем максимально глубоко вложенный объект, чтобы  его полю присвоить значение
        for (let i = 0; i < fieldKeys.length - 1; i++) {
          targetObject = targetObject[fieldKeys[i]];
        }
        targetObject[fieldKeys[fieldKeys.length - 1]] = nextValue;
      } else {
        this.nextStudentData[fieldKey] = nextValue;
      }
    },

    addStudentToDB() {
      const database = getDatabase();
      const nextStudentId = nanoid();
      set(ref(database, `${STUDENTS_FB_PATH}/${nextStudentId}`), {
        ...this.nextStudentData,
        id: nextStudentId,
      });
      this.currentStep = 4;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-student-form {
  display: flex;
  flex-direction: column;
  background-color: #2a2e96;
  padding: 50px 80px;
  min-width: 900px;
  width: 900px;
  height: 750px;
  border-radius: 50px;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
  }

  &__title {
    font-weight: 700;
    font-size: 48px;
    line-height: 59px;
    color: #ffffff;
  }

  &__body {
    flex: 1;
  }

  &__action-button {
    &:first-child {
      margin-right: 24px;
    }
  }

  &__step-form {
    width: 100%;
  }

  &__added-successfully {
    height: 100%;
  }

  &__added-successfully-text {
    margin-top: 160px;
    color: #ffffff;
    font-weight: 700;
    font-size: 48px;
    line-height: 59px;
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

.step2-form {
  display: grid;
  grid-template-areas:
    "height weight ."
    "heart-rate blood-pressure dynamometer";

  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 24px;

  &__height {
    grid-area: height;
  }

  &__weight {
    grid-area: weight;
  }

  &__heart-rate {
    grid-area: heart-rate;
  }

  &__blood-pressure {
    grid-area: blood-pressure;
  }

  &__dynamometer {
    grid-area: dynamometer;
  }
}

.step3-form {
  display: grid;
  grid-template-areas:
    "squats running ."
    "boat push-ups pull-ups";

  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 24px;

  &__squats {
    grid-area: squats;
  }

  &__running {
    grid-area: running;
  }

  &__boat {
    grid-area: boat;
  }

  &__push-ups {
    grid-area: push-ups;
  }

  &__pull-ups {
    grid-area: pull-ups;
  }
}
</style>
