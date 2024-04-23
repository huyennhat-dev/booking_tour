import { Provider } from "react-redux";

import { store } from "../../redux/store";
import RouterManagerPage from "../../routes/ManagerRoute";

const User = () => {
  return (
    <Provider store={store}>
      <RouterManagerPage />
    </Provider>
  );
};

export default User;