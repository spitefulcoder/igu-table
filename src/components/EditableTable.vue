// @ts-nocheck
<template>
  <b-table
    v-click-outside="handleClickOut"
    v-bind="{ ...$props, ...$attrs }"
    v-on="handleListeners($listeners)"
    :items="tableItems"
  >
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
    <template v-for="(field, index) in fields" #[`cell(${field.key})`]="data">
      <div :key="index" v-if="showField(field, data, 'date')">
        <b-form-datepicker
          :id="`${field.key}-${data.item.id}`"
          @keydown.native="handleKeydown($event, index, data)"
          @input="(value) => inputHandler(value, data, field.key)"
          v-bind="{ ...field }"
          v-focus="enableFocus('date')"
          :key="index"
          :type="field.type"
          :value="getFieldValue(field, data)"
          :state="getValidity(data, field).valid ? null : false"
        ></b-form-datepicker>
        <b-tooltip
          v-if="getValidity(data, field).errorMessage"
          :target="`${field.key}-${data.item.id}`"
          variant="danger"
          :show="!getValidity(data, field).valid"
          :disabled="true"
        >
          {{ getValidity(data, field).errorMessage }}
        </b-tooltip>
      </div>
      <div :key="index + index" v-else-if="showField(field, data, 'select')">
        <v-select
          :clearable="false"
          :id="`${field.key}-${data.item.id}`"
          @keydown.native="handleKeydown($event, index, data)"
          @input="
            (value) => inputHandler(value, data, field.key, field.options)
          "
          v-bind="{ ...field }"
          class="vinput"
          v-focus="enableFocus()"
          label="name"
          :options="field.options"
          :value="data.item[[field.key]]"
        ></v-select>
      </div>
      <b-form-checkbox
        :id="`${field.key}-${data.item.id}`"
        @keydown.native="handleKeydown($event, index, data)"
        @change="(value) => inputHandler(value, data, field.key)"
        v-bind="{ ...field }"
        v-focus="enableFocus('checkbox')"
        v-else-if="showField(field, data, 'checkbox')"
        :key="index + index + index"
        :checked="getFieldValue(field, data)"
      ></b-form-checkbox>
      <b-form-rating
        :id="`${field.key}-${data.item.id}`"
        @keydown.native="handleKeydown($event, index, data)"
        @change="(value) => inputHandler(value, data, field.key)"
        v-bind="{ ...field }"
        v-focus="enableFocus()"
        v-else-if="showField(field, data, 'rating')"
        :key="index + index + index + index"
        :value="getFieldValue(field, data)"
      ></b-form-rating>
      <div
        :key="index + index + index + index + index"
        v-else-if="showField(field, data, field.type)"
      >
        <b-form-input
          :id="`${field.key}-${data.item.id}`"
          @keydown="handleKeydown($event, index, data)"
          @input="(value) => inputHandler(value, data, field.key)"
          @change="(value) => changeHandler(value, data, field.key)"
          v-bind="{ ...field }"
          v-focus="enableFocus()"
          :type="field.type"
          :value="getFieldValue(field, data)"
        ></b-form-input>
      </div>
      <div
        class="data-cell"
        @[editTrigger]="
          handleEditCell($event, data.item.id, field.key, field.editable)
        "
        v-else
        :key="index"
      >
        <slot
          v-if="$scopedSlots[`cell(${field.key})`]"
          :name="`cell(${field.key})`"
          v-bind="getCellData(data)"
        ></slot>
        <template v-else>{{ getCellValue(data, field) }}</template>
      </div>
    </template>
  </b-table>
</template>

<script lang="js">
import {
  BTable,
  BFormDatepicker,
  BFormInput,
  BFormSelect,
  BFormCheckbox,
  BFormRating,
  BTooltip,
} from "bootstrap-vue";
import Vue from "vue";

export default Vue.extend({
  name: "BEditableTable",
  components: {
    BTable,
    BFormDatepicker,
    BFormInput,
    BFormSelect,
    BFormCheckbox,
    BFormRating,
    BTooltip,
  },
  props: {
    fields: {
      type: Array,
    },
    items: {
      type: Array,
    },
    value: {
      type: Array,
    },
    editMode: {
      default: "cell",
    },
    editTrigger: {
      default: "click",
    },
    rowUpdate: {
      type: Object,
      default: null,
    },
    disableDefaultEdit: {
      type: Boolean,
      default: false,
    },
  },
  directives: {
    focus: {
      inserted: function (el, event) {
        switch (event.value) {
          case false: {
            return;
          }
          case "checkbox":
            el.children[0].focus();
          case "date":
            el.children[0].focus();
          default:
            el.focus();
        }
      },
    },
    clickOutside: {
      bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el == event.target || el.contains(event.target))) {
            if (document.contains(event.target)) {
              vnode.context[binding.expression](event);
            }
          }
        };
        document.addEventListener("click", el.clickOutsideEvent);
      },
      unbind: function (el) {
        document.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
  data() {
    return {
      selectedCell: {
        default: null,
      },
      tableItems: [],
      tableMap: {},
      localChanges: {},
    };
  },
  mounted() {
    this.editMode = this.editMode;
    this.createTableItems(this.value ? this.value : this.items);
  },
  watch: {
    value(newVal) {
      this.createTableItems(newVal);
    },
    items(newVal) {
      this.createTableItems(newVal);
    },
    rowUpdate: {
      handler(newVal) {
        if (this.tableMap[newVal.id]) {
          this.tableMap[newVal.id].isEdit = newVal.edit;
        }
        if (newVal.action === "update") {
          this.clearValidation(newVal.id);
          this.updateData(newVal.id);
        } else if (newVal.action === "add") {
          this.updateData(newVal.id, "add", { ...newVal.data }, newVal.edit);
        } else if (newVal.action === "delete") {
          this.updateData(newVal.id, "delete");
        } else if (newVal.action === "cancel" || newVal.isEdit === false) {
          this.clearValidation(newVal.id);
          delete this.localChanges[newVal.id];
        }
      },
      deep: true,
    },
  },
  computed: {},
  methods: {
    handleEditCell(e, id, name, editable) {
      if (!this.disableDefaultEdit && editable) {
        e.stopPropagation();
        this.clearEditMode();
        this.updateData();
        this.tableMap[id].isEdit = true;
        this.selectedCell = name;
        this.clearValidation(id);
        if (!this.localChanges[id]) {
          this.localChanges[id] = {};
        }
      }
    },
    clearValidation(id) {
      // Clear validation for the selected row
      for (const key in this.tableMap[id].fields) {
        this.tableMap[id].fields[key].validity = { valid: true };
      }
    },
    handleKeydown(e, index, data) {
      if (
        (e.code === "Tab" || e.code === "Enter") &&
        this.editMode === "cell" &&
        !this.disableDefaultEdit
      ) {
        e.preventDefault();
        let fieldIndex = this.fields.length - 1 === index ? 0 : index + 1;
        let rowIndex =
          this.fields.length - 1 === index ? data.index + 1 : data.index;
        let i = fieldIndex;
        // Find next editable field
        while (!this.fields[i].editable) {
          if (i === this.fields.length - 1) {
            i = 0;
            rowIndex++;
          } else {
            i++;
          }
        }
        fieldIndex = i;
        this.selectedCell = this.fields[fieldIndex].key;
        this.clearEditMode(data.item.id);
        this.updateData(data.item.id);

        const rowId = this.tableItems[rowIndex]?.id;
        if (this.tableMap[rowId]) {
          this.tableMap[rowId].isEdit = true;
          if (!this.localChanges[rowId]) {
            this.localChanges[rowId] = {};
          }
        }
      } else if (e.code === "Escape") {
        e.preventDefault();
        this.selectedCell = null;
        this.clearEditMode(data.item.id);
        this.localChanges = {};
      }
    },
    handleClickOut() {
      if (!this.disableDefaultEdit) {
        this.selectedCell = null;
        this.clearEditMode();
        this.updateData();
      }
    },
    inputHandler(value, data, key, options) {
      console.log(...arguments);
      let changedValue = value;
      // Handle select element with options
      if (options) {
        const selectedValue = options.find((item) => item.value === value);
        changedValue = selectedValue ? selectedValue.value : value;
      }

        const validity = data.field.validate
        ? data.field.validate(changedValue)
        : { valid: true };
      const fields = this.tableMap[data.item.id].fields;

      if (this.value && (!validity || validity?.valid === true)) {
        if (!this.localChanges[data.item.id]) {
          this.localChanges[data.item.id] = {};
        }
        this.localChanges[data.item.id][key] = {
          value: changedValue,
          rowIndex: data.index,
        };
      } else {
        fields[key].validity = validity;
      }
      const fieldType = data.field.type;
      const excludeTypes = {
        text: true,
        range: true,
        number: true,
      };
      if (!excludeTypes[fieldType]) {
        this.$emit("input-change", {
          ...data,
          id: data.item.id,
          value: changedValue,
        });
      }
    },
    changeHandler(value, data, key) {
      this.$emit("input-change", {
        ...data,
        id: data.item.id,
        value,
        validity: { ...this.tableMap[data.item.id].fields[key].validity },
      });
    },
    updateData(id, action, data, isEdit) {
      let isUpdate = false;
      const objId = id ? id : Object.keys(this.localChanges)[0];
      if (action === "add") {
        isUpdate = true;
        // Warning: if watcher don't trigger the new row will not update the tableMap properly
        this.tableMap[id] = { id, isEdit, fields: {} };
        this.tableItems.unshift(data);
      } else if (action === "delete") {
        isUpdate = true;
        delete this.tableMap[id];
        this.tableItems = this.tableItems.filter((item) => item.id !== id);
      } else {
        const objValue = id
          ? this.localChanges[id]
          : Object.values(this.localChanges)[0];

        // If v-model is set then emit updated table
        if (this.value && objValue) {
          Object.keys(objValue).forEach((key) => {
            isUpdate = true;
            const cell = objValue[key];
            this.tableMap[objId].fields[key].value = cell.value;
            let rowIndex = cell.rowIndex;
            const currentPage = this.$attrs["current-page"];
            const perPage = this.$attrs["per-page"];
            if (currentPage > 1 && perPage > 0) {
              rowIndex = (currentPage - 1) * perPage + rowIndex;
            }
            this.tableItems[rowIndex][key] = cell.value;
          });
        }
      }
      if (isUpdate) {
        this.$emit("input", this.tableItems);
      }
      delete this.localChanges[id ? id : objId];
    },
    handleListeners(listeners) {
      // Exclude listeners that are not part of Bootstrap Vue
      const excludeEvents = {
        input: true,
        "input-change": true,
      };
      return Object.keys(listeners).reduce(
        (a, c) =>
          excludeEvents[c] ? a : { ...a, [c]: listeners[c] },
        {}
      );
    },
    getCellValue(data, field) {
      const row = this.tableMap[data.item.id];
      let value =
      row && row.fields[field.key] ? row.fields[field.key].value : "";
      // Handle select element with options
      if (data.field.options) {
        const selectedValue = data.field.options.find(
          (item) => item.value === value
          );
          value = selectedValue ? selectedValue.text : value;
        }
      return value.name || value;
    },
    getCellData(data) {
      return {
        ...data,
        isEdit: this.tableMap[data.item.id].isEdit,
        id: data.item.id,
      };
    },
    getValidity(data, field) {
      // console.log(this.tableMap[data.item.id].fields[field.key]);
      return this.tableMap[data.item.id].fields[field.key];
    },
    showField(field, data, type) {
      return (
        field.type === type &&
        this.tableMap[data.item.id]?.isEdit &&
        (this.selectedCell === field.key || this.editMode === "row") &&
        field.editable
      );
    },
    getFieldValue(field, data) {
      return this.tableMap[data.item.id].fields[field.key]?.value;
    },
    enableFocus(type) {
      return this.editMode === "cell" ? type : false;
    },
    clearEditMode(id) {
      if (id) {
        this.tableMap[id].isEdit = false;
      } else {
        for (const changeId in this.localChanges) {
          this.tableMap[changeId].isEdit = false;
        }
      }
    },
    createTableItems(data) {
      this.tableItems = data.map((item) => ({ ...item }));
      this.tableMap = data.reduce(
        (rows, curRow) => ({
          ...rows,
          [curRow.id]: {
            id: curRow.id,
            isEdit: this.tableMap[curRow.id]
              ? this.tableMap[curRow.id].isEdit
              : false,
            fields: Object.keys(curRow).reduce(
              (keys, curKey) => ({
                ...keys,
                [curKey]: {
                  value: curRow[curKey],
                  validity: this.tableMap[curRow.id]?.fields[curKey]?.validity
                    ? this.tableMap[curRow.id].fields[curKey].validity
                    : { valid: true },
                },
              }),
              {}
            ),
          },
        }),
        {}
      );
    },
  },
});
</script>

<style lang="scss">
table.b-table {
  width: unset;
}
table.b-table td {
  padding: 0;
}
.data-cell {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
