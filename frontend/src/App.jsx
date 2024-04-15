import { store } from "./redux/store";
import { Provider } from "react-redux";

import Navbar from "./components/Navbar";
import RouterPage from "./routes";

export default function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <RouterPage/>
    </Provider>
  );
}
