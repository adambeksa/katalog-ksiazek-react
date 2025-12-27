import { useState, useRef, useEffect } from 'react'
import './FilterSelect.css'

function FilterSelect({ label, value, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef(null)

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) setSearchQuery('')
  }

  const handleSelect = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="filter-select-container" ref={containerRef}>
      <label className="filter-select-label">{label}</label>
      <div className={`filter-select-toggle ${isOpen ? 'active' : ''}`} onClick={handleToggle}>
        <span className="filter-select-value">{value}</span>
        <span className="filter-select-arrow">▼</span>
      </div>

      {isOpen && (
        <div className="filter-select-dropdown">
          {options.length > 5 && (
            <div className="filter-select-search-wrapper">
              <input
                type="text"
                className="filter-select-search"
                placeholder="Szukaj..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          )}
          <ul className="filter-select-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  className={`filter-select-item ${option === value ? 'selected' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="filter-select-no-results">Brak wyników</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FilterSelect
