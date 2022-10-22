<template>
  <div class="navs">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="`nav-item${item.isActive ? '--active' : ''}`"
      @click="handleActivate(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderNav",

  data: () => ({
    items: [
      { label: "Общая информация", isActive: true, value: "general" },
      { label: "Физическое развитие", isActive: false, value: "physical" },
      { label: "Физическая подготовка", isActive: false, value: "standards" },
    ],
  }),
  methods: {
    handleActivate(item) {
      this.items.forEach((element) => {
        element.isActive = false;
      });
      item.isActive = true;
      this.$emit("change-tab", item.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.navs {
  display: flex;
}

.nav-item--active {
  background: #2a2e96;
  border: 1px solid #2a2e96;
  border-radius: 50px;
  color: #ffffff;
  &:hover {
    color: #ffffff !important;
  }
}
.navs > div {
  padding: 8px 17px;
  margin-right: 66px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  &:hover {
    color: #2a2e96;
  }
}
</style>
