import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

function App() {
  // const dispatch = useDispatch<AppDispatch>();
  // const data = useSelector((state) => state.music.collections);
  // console.log(data, "music");

  // const open = () => {
  //   dispatch(fetchMusic());
  // };
  return (
    <div className="app">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
