import Table, { Column } from "../Table";
import Filter from "../Filter";
import {
  formatDuration,
  formatDate,
  bytesToMB,
} from "../../utils/BasicUtility";
import "./styles.css";
import { useEffect, useMemo, useState } from "react";
import {
  fetchMusic,
  fetchMusicById,
  filterCollections,
} from "../../redux/slices/music";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Collection } from "../../redux/slices/music/interface";
import Pagination from "../Pagination";
import { BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import EmptyContent from "../EmptyContent";

interface MusicCollectionsProps {
  showFilters?: boolean;
}

const MusicCollections = ({ showFilters = true }: MusicCollectionsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filteredCollections = useAppSelector(
    (state) => state.music.filteredCollections
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const itemsPerPage = 10;
  const filterOptions = ["Album", "EP", "Single"];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCollections?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const columns: Column<Collection>[] = [
    { key: "nameArtist", header: "Collection Name", width: "30%" },
    { key: "type", header: "Type" },
    { key: "songCount", header: "Song Count" },
    { key: "durationInSeconds", header: "Duration" },
    { key: "sizeInBytes", header: "Size" },
    { key: "releasedOn", header: "Released On" },
    { key: "action", header: "", width: "10%" },
  ];

  const handleActionClick = (album: Collection) => {
    dispatch(
      fetchMusicById({
        urlParams: {
          collectionId: album.id,
        },
      })
    );
    navigate(`/collection-details/${album.id}`);
  };

  const renderCell = (column: Column<Collection>, album: Collection) => {
    switch (column.key) {
      case "nameArtist":
        return (
          <td className="table-cell name-artist-cell">
            <span className="primary-text">{album.name}</span>
            <span className="secondary-text">{album.artist}</span>
          </td>
        );
      case "type":
        return <td className="table-cell">{album.type}</td>;
      case "songCount":
        return <td className="table-cell">{album.songCount}</td>;
      case "durationInSeconds":
        return (
          <td className="table-cell">
            {formatDuration(album.durationInSeconds)}
          </td>
        );
      case "sizeInBytes":
        return <td className="table-cell">{bytesToMB(album.sizeInBytes)}</td>;
      case "releasedOn":
        return <td className="table-cell">{formatDate(album.releasedOn)}</td>;
      case "action":
        return (
          <td className="table-cell action-cell">
            <button
              onClick={() => handleActionClick(album)}
              className="action-button"
            >
              <BsEyeFill size={16} />
              <p>View Details</p>
            </button>
          </td>
        );
      default:
        return <td className="table-cell">-</td>;
    }
  };

  const debouncedFilters = useMemo(
    () =>
      debounce((query: string, selected: string[]) => {
        dispatch(
          filterCollections({ searchTerm: query, selectedOptions: selected })
        );
      }, 400),
    [dispatch]
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleOptionChange = (type: string) => {
    if (selectedOptions.includes(type)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== type));
    } else {
      setSelectedOptions([...selectedOptions, type]);
    }
  };

  useEffect(() => {
    dispatch(fetchMusic());
  }, [dispatch]);

  useEffect(() => {
    debouncedFilters(searchTerm, selectedOptions);
  }, [searchTerm, selectedOptions, debouncedFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCollections]);

  return (
    <div className="music-collections">
      {showFilters && (
        <Filter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedOptions={selectedOptions}
          onTypeChange={handleOptionChange}
          options={filterOptions}
        />
      )}
      {filteredCollections?.length === 0 && (
        <EmptyContent
          imgSrc="/src/assets/empty.png"
          label="No Items to Display"
        />
      )}
      {currentItems &&
        filteredCollections &&
        filteredCollections.length > 0 && (
          <>
            <Table
              columns={columns}
              data={currentItems}
              cellRenderer={renderCell}
            />
            <Pagination
              totalItems={filteredCollections.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
    </div>
  );
};

export default MusicCollections;
