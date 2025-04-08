// import { APIAddress, version ,projectTitle} from "./ApiVersion";
export const initialState = {
  user: null,
  headerData: {},
  theme: sessionStorage.getItem("theme")
    ? sessionStorage.getItem("theme")
    : "darkTheme",
  modelText: "0",
  showSidebar: true,
  apiSpinner:false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HEADER_DATA":
      return { ...state, headerData: action.headerData }

    case "SET_USER_PROFILE_DATA":
      return { ...state, userProfileData: action.userProfileData }

    case "SET_THEME":
      return { ...state, theme: action.theme };

    case "SET_MODAL_TEXT":
      return { ...state, modelText: action.modelText };

    case "SET_ENABLE_SIDEBAR":
      return { ...state, showSidebar: action.showSidebar };

    case "SET_API_SPINNER":
      return {...state, apiSpinner: action.apiSpinner};

    default:
      return state;
  }
};
export default reducer;
