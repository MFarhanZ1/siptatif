import { RouterProvider } from "react-router-dom";
import router from "./routers/main";

const App = () => {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
