import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import CollectionDetails from "./CollectionDetails";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/collection-details/:collectionId",
    element: <CollectionDetails />,
  },
]);
