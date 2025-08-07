export const dialogInitial = {
  isOpen: false,
  message: "",
  title: "",
  status: "",
  url: "",
  data: {},
  dialog: "",
};

export const dialogAction = {
  RESET: "RESET",
  DIALOG_INFO: "DIALOG_INFO",
  DIALOG_DELETE: "DIALOG_DELETE",
  DIALOG_LOGOUT: "DIALOG_LOGOUT",
  DIALOG_DELETE_SOME: "DIALOG_DELETE_SOME",
};

export const dialogReducer = (state, action) => {
  switch (action.type) {
    case dialogAction.RESET:
      return { ...dialogInitial };

    case dialogAction.DIALOG_INFO:
      return {
        isOpen: true,
        message: action.payload.message,
        title: action.payload.title,
        status: action.payload.status,
        dialog: "info",
      };

    case dialogAction.DIALOG_DELETE:
      return {
        isOpen: true,
        message: action.payload.message,
        title: action.payload.title,
        status: action.payload.status,
        url: action.payload.url,
        dialog: "delete",
      };

    case dialogAction.DIALOG_LOGOUT:
      return {
        isOpen: true,
        message: action.payload.message,
        title: action.payload.title,
        status: action.payload.status,
        dialog: "logout",
      };

    case dialogAction.DIALOG_DELETE_SOME:
      return {
        isOpen: true,
        message: action.payload.message,
        title: action.payload.title,
        status: action.payload.status,
        url: action.payload.url,
        data: action.payload.data,
        dialog: "delete_some",
      };

    default:
      return state;
  }
};
