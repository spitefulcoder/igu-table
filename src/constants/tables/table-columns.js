import {
  faculty,
  courses,
  studentsGroups,
  medGroups,
} from "../selects-options/selects-options";
import { optionToETSelectMapper } from "../selects-options/mappers";
// const mappedCourses = courses.map(optionToETSelectMapper);
// const mappedFaculty = faculty.map(optionToETSelectMapper);
// const mappedStudentsGroups = studentsGroups.map(optionToETSelectMapper);
// const mappedmedGroups = medGroups.map(optionToETSelectMapper);

export const tableColumns = {
  // Вкладка общая информация
  generalFields: [
    {
      key: "delete",
      label: "",
      class: "delete-col"
    },
    {
      key: "fullname",
      label: "Фамилия Имя Отчество",
      editable: true,
      class: "full-name-col"
    },
    {
      key: "dateOfBirth",
      label: "Дата рождения",
      editable: true,
      class: "date-of-birth-col"
    },
    {
      key: "course",
      label: "Курс",
      type: "select",
      options: courses,
      editable: true,
      class: "course-col"
    },
    {
      key: "faculty",
      label: "Факультет",
      type: "select",
      options: faculty,
      editable: true,
      class: "faculty-col"
    },
    {
      key: "group",
      label: "Группа",
      type: "select",
      options: studentsGroups,
      editable: true,
      class: "group-col"
    },
    {
      key: "healthGroup",
      label: "Группа здоровья",
      type: "select",
      options: medGroups,
      editable: true,
      class: "health-group-col"
    },
  ],
  // Физическое развитие
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
  // Физ. подготовка (нормативы)
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
