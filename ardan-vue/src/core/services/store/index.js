import Vue from "vue";
import Vuex from "vuex";

import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";
import profile from "./profile.module";
import theAuth from "./theAuth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    htmlClass,
    config,
    breadcrumbs,
    profile,
    theAuth
  }
});
