import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFileExcel,
  faIdCard,
  faSearch,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
library.add(faFileExcel, faIdCard, faSearch, faCheck);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);
