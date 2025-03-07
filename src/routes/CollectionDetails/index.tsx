import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useAppDispatch, useAppSelector } from "../../hooks";
import SelectedCollection from "./SelectedCollection";
import "./styles.css";
import { useEffect } from "react";
import { fetchMusic, fetchMusicById } from "../../redux/slices/music";
import BreadCrumb from "../../components/BreadCrumb";

const CollectionDetails = () => {
  const params = useParams();
  const collectionId = params.collectionId;
  const dispatch = useAppDispatch();

  const collection = useAppSelector((state) => state.music.selectedCollection);
  const filteredCollections = useAppSelector(
    (state) => state.music.filteredCollections
  );

  const breadcrumbItems = collection && [
    { label: "Overview", path: "/", isActive: false },
    { label: collection?.name, isActive: true },
  ];

  useEffect(() => {
    if (!filteredCollections) {
      dispatch(fetchMusic());
    }
    if (!filteredCollections && collectionId) {
      dispatch(
        fetchMusicById({
          urlParams: {
            collectionId,
          },
        })
      );
    }
  }, [dispatch, collection, collectionId, filteredCollections]);

  return (
    <div className="collection-container">
      {breadcrumbItems && <BreadCrumb items={breadcrumbItems} />}
      <Header title={collection?.name} />
      <div className="content">
        <SelectedCollection collection={collection} />
      </div>
    </div>
  );
};

export default CollectionDetails;
