import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import "./styles.css";

interface FilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedOptions: string[];
  onTypeChange: (type: string) => void;
  options: string[];
}
const Filter = ({
  searchTerm,
  onSearchChange,
  selectedOptions,
  onTypeChange,
  options,
}: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-content">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for albums"
          className="search-input"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <IoSearch className="search-icon" size="20px" />
      </div>

      <div className="dropdown-container" ref={dropdownRef}>
        <button
          className={`dropdown-button ${
            selectedOptions.length > 0 ? "active" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="dropdown-title">{`Type ${
            selectedOptions.length > 0 ? `(${selectedOptions.length})` : ""
          }`}</span>
          {!isOpen && <IoIosArrowDown size="18px" color="#08090A" />}
          {isOpen && <IoIosArrowUp size="18px" color="#08090A" />}
        </button>
        {isOpen && (
          <div className="dropdown-content">
            {options.map((type) => (
              <label key={type} className="dropdown-item">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(type)}
                  onChange={() => onTypeChange(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
