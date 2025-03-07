import { ImNext, ImPrevious } from "react-icons/im";
import "./styles.css";
interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = () => {
    const result = [];
    for (let i = 1; i <= totalPages; i++) {
      result.push(i);
    }
    return result;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ImPrevious />
      </button>

      <div className="pagination-numbers">
        {pages().map((page) => (
          <button
            key={page}
            className={`pagination-number ${
              currentPage === page ? "active" : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ImNext />
      </button>
    </div>
  );
};

export default Pagination;
