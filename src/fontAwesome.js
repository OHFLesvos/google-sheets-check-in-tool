import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFileExcel,
  faIdCard,
  faSearch,
  faCheck,
  faSignOutAlt,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faGoogleDrive
} from "@fortawesome/free-brands-svg-icons";
library.add(faFileExcel, faIdCard, faSearch, faCheck, faSignOutAlt, faGoogle, faUserCheck, faGoogleDrive);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);
