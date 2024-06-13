import React, { useState, useEffect } from 'react';

interface FilterSidebarProps {
  onFilterChange: (filters: string[]) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<string[]>(['all']);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (filter: string) => {
    if (filter === 'all') {
      setFilters(['all']);
    } else {
      const updatedFilters = filters.includes('all')
        ? [filter]
        : filters.includes(filter)
        ? filters.filter((f) => f !== filter)
        : [...filters, filter];
      setFilters(updatedFilters);
    }
  };

  return (
    <div className="sidebar">
      <h3>Filter Options</h3>
      <div className="filter-options">
        <div className="option flex items-center">
          <input
            type="checkbox"
            id="all"
            checked={filters.includes('all')}
            onChange={() => handleFilterChange('all')}
          />
          <label htmlFor="all" className="ml-2">
            All
          </label>
        </div>
        <hr className="filter-separator my-2" />
        <div className="option flex items-center">
          <input
            type="checkbox"
            id="kindergarten"
            checked={filters.includes('kindergarten')}
            onChange={() => handleFilterChange('kindergarten')}
          />
          <label htmlFor="kindergarten" className="ml-2">
            Kindergartens
          </label>
        </div>
        <div className="option flex items-center">
          <input
            type="checkbox"
            id="schools"
            checked={filters.includes('schools')}
            onChange={() => handleFilterChange('schools')}
          />
          <label htmlFor="schools" className="ml-2">
            Schools
          </label>
        </div>
        <div className="option flex items-center">
          <input
            type="checkbox"
            id="social-teen-projects"
            checked={filters.includes('social-teen-projects')}
            onChange={() => handleFilterChange('social-teen-projects')}
          />
          <label htmlFor="social-teen-projects" className="ml-2">
            Social Teen Projects
          </label>
        </div>
        <div className="option flex items-center">
          <input
            type="checkbox"
            id="social-child-projects"
            checked={filters.includes('social-child-projects')}
            onChange={() => handleFilterChange('social-child-projects')}
          />
          <label htmlFor="social-child-projects" className="ml-2">
            Social Child Projects
          </label>
          
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;