export interface State {
  darkMode: boolean;
}

export type Action = 
  | { type: "TOGGLE" }
  | { type: "ENABLE" }
  | { type: "DISABLE" };

const DarkModeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE":
      return { darkMode: !state.darkMode };
    case "ENABLE":
      return { darkMode: true };
    case "DISABLE":
      return { darkMode: false };
    default:
      return state;
  }
};

export default DarkModeReducer;
