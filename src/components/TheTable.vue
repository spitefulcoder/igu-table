<template>
  <div>
    <b-editable-table
      striped
      class="editable-table"
      :filter="filter"
      :value="items"
      :fields="fields"
      @input-change="handleInput"
    >
      <template #head(fullname)>
        <b-input-group>
          <b-form-input
            class="search-input"
            v-model="filter"
            type="search"
            placeholder="ФИО"
          >
          </b-form-input>
          <b-input-group-append class="icon">
            <b-icon icon="search"></b-icon>
          </b-input-group-append>
        </b-input-group>
      </template>
    </b-editable-table>
  </div>
</template>

<script>
// import BEditableTable from "bootstrap-vue-editable-table";
import BEditableTable from "./EditableTable.vue";

export default {
  components: {
    BEditableTable,
  },
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      filter: null,
    };
  },
  methods: {
    handleInput(data) {
      this.$emit("update", data);
    },
  },
};
</script>
<style lang="scss" scoped>
.editable-table {
  width: 1140px;
}

::v-deep .data-cell {
  height: 64px !important;
}

::v-deep .data-cell {
  align-items: center;
  justify-content: center;
}
::v-deep tbody > tr > td {
  text-align-last: center;
  vertical-align: middle;
}

::v-deep .table-striped > tbody > tr:nth-child(odd) > td,
.table-striped > tbody > tr:nth-child(odd) > th {
  background: #ecf0ff;
  box-shadow: 0px 5px 4px rgba(196, 196, 196, 0.1);
}

::v-deep .table-striped > tbody > tr:nth-child(even) > td,
.table-striped > tbody > tr:nth-child(even) > th {
  background: #dbe3ff;
  box-shadow: 0px 5px 4px rgba(196, 196, 196, 0.1);
}

::v-deep thead {
  background: #2a2e96;
  border-radius: 50px 50px 0px 0px;
  color: white;
  text-align-last: center;
}
::v-deep thead > tr > th {
  vertical-align: middle;
}

::v-deep thead > tr > th:nth-child(1) {
  background: #2a2e96;
  text-align-last: left;
  border-radius: 50px 0px 0px 0px;
}

::v-deep thead > tr > th:last-child {
  border-radius: 0px 50px 0px 0px;
}

::v-deep .search-input {
  width: 100px;
}

::v-deep .form-control {
  display: inline-block !important;
  background: transparent;
  font-size: 18px;
  border: none;
  outline: none;
  padding: 0;
  &::placeholder {
    background: transparent;
    border: none;
    outline: none;
  }
  &:focus {
    display: inline-block !important;
    background: transparent;
    border: none;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    padding: 0;
  }
}
::v-deep .custom-select {
  background: red;
  &::placeholder {
    background: red;
  }
  &:focus {
    background: red;
  }
}

.search-input {
  background: transparent;
  border: 0;
  color: transparent;
  outline: 0;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  &::placeholder {
    color: white;
  }
  &:focus {
    outline: none;
    background: transparent;
    border: none;
    color: white;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}
.icon {
  align-self: center;
}
</style>
