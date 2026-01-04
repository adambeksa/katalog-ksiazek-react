import { useState, useRef, useEffect } from "react";
import "./FilterSelect.scss";

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setSearchQuery("");
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="filter-select" ref={containerRef}>
      <label className="filter-select__label">{label}</label>
      <div
        className={`filter-select__toggle ${isOpen ? "active" : ""}`}
        onClick={handleToggle}
      >
        <span className="filter-select__value">{value}</span>
        <span className="filter-select__arrow">▼</span>
      </div>

      {isOpen && (
        <div className="filter-select__dropdown">
          {options.length > 5 && (
            <div className="filter-select__search-wrapper">
              <input
                type="text"
                className="filter-select__search"
                placeholder="Szukaj..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          )}
          <ul className="filter-select__options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className={`filter-select__item ${option === value ? "selected" : ""}`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="filter-select__no-results">Brak wyników</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FilterSelect;
