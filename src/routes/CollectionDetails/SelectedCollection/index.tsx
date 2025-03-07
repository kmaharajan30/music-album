import Card from "../../../components/Card";
import Table, { Column } from "../../../components/Table";
import { Collection, Song } from "../../../redux/slices/music/interface";
import {
  bytesToMB,
  formatDate,
  formatDuration,
  formatNames,
} from "../../../utils/BasicUtility";
import "./styles.css";

interface SelectedCollectionProps {
  collection: Collection | null;
}
const SelectedCollection = ({ collection }: SelectedCollectionProps) => {
  const transformedData = collection && [
    { label: "Artist", value: collection?.artist },
    { label: "Type", value: collection?.type },
    { label: "Song Count", value: collection?.songCount },
    { label: "Total Size", value: bytesToMB(collection?.sizeInBytes) },
    {
      label: "Total Duration",
      value: formatDuration(collection?.durationInSeconds, true),
    },
    { label: "Released On", value: formatDate(collection?.releasedOn, false) },
  ];

  const columns: Column<Song>[] = [
    { key: "title", header: "Song", width: "30%" },
    { key: "performers", header: "Performers", width: "40%" },
    { key: "durationInSeconds", header: "Duration", width: "20%" },
    { key: "sizeInBytes", header: "Size", width: "20%" },
  ];

  const renderCell = (column: Column<Song>, song: Song) => {
    switch (column.key) {
      case "title":
        return <td className="table-cell">{song.title}</td>;
      case "performers":
        return <td className="table-cell">{formatNames(song.performers)}</td>;
      case "durationInSeconds":
        return (
          <td className="table-cell">
            {formatDuration(song.durationInSeconds)}
          </td>
        );
      case "sizeInBytes":
        return <td className="table-cell"> {bytesToMB(song.sizeInBytes)}</td>;

      default:
        return <td className="table-cell">-</td>;
    }
  };

  return (
    <div className="selected-container">
      {transformedData && <Card data={transformedData} />}
      {collection?.songs && (
        <Table
          columns={columns}
          data={collection?.songs}
          cellRenderer={renderCell}
        />
      )}
    </div>
  );
};

export default SelectedCollection;
