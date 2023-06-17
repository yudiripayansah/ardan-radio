<template>
  <!-- begin:: Footer -->
  <div class="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
    <div
      class="d-flex align-items-center justify-content-between row"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="text-dark pl-3 pl-sm-0">
        <span class="text-muted font-weight-bold mr-2">
          2021 &nbsp;&copy;&nbsp;
        </span>
        <a
          href="http://hseswadaya.co.id"
          target="_blank"
          class="text-dark-75 text-hover-primary"
        >
          EASYCO BY KOPIKODING
        </a>
      </div>
      <div class="nav nav-dark pl-3 pl-sm-0">
        <a
          href="https://kopikoding.com"
          target="_blank"
          class="nav-link pr-3 pl-0"
        >
          Website
        </a>
        <a
          href="https://kopikoding.com/about"
          target="_blank"
          class="nav-link px-3"
        >
          About
        </a>
        <a
          href="https://kopikoding.com/products"
          target="_blank"
          class="nav-link px-3"
        >
          Other Product
        </a>
        <a
          href="https://kopikoding.com/contact"
          target="_blank"
          class="nav-link pl-3 pr-0"
        >
          Contact
        </a>
      </div>
    </div>
  </div>
  <!-- end:: Footer -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "KTFooter",
  computed: {
    ...mapGetters(["layoutConfig"]),

    /**
     * Check if footer container is fluid
     */
    widthFluid() {
      return this.layoutConfig("footer.width") === "fluid";
    }
  }
};
</script>
