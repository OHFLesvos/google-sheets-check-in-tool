import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFileExcel,
  faIdCard,
  faSearch,
  faCheck,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle
} from "@fortawesome/free-brands-svg-icons";
library.add(faFileExcel, faIdCard, faSearch, faCheck, faSignOutAlt, faGoogle);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);
