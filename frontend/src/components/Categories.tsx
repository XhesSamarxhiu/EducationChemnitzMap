// CategoryDropdown.tsx
import React from 'react';

interface CategoryDropdownProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  isOpen: boolean;
  toggleDropdown: () => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ selectedCategory, onSelectCategory, isOpen, toggleDropdown }) => {
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'all':
        return 'Categories';
      case 'kindergartens':
        return 'Kindergartens';
      case 'schools':
        return 'Schools';
      case 'socialChildProjects':
        return 'Social Child Projects';
      case 'socialTeenProjects':
        return 'Social Teen Projects';
      default:
        return 'Select Category';
    }
  };
  return (
    <div className="relative inline-block">
      <button
        className={`w-full px-4 py-2 rounded-md text-white text-center ${
          selectedCategory === 'all'
            ? 'bg-[#006769]'
            : selectedCategory === 'kindergartens'
            ? 'bg-green-600'
            : selectedCategory === 'schools'
            ? 'bg-red-500'
            : selectedCategory === 'socialChildProjects'
            ? 'bg-blue-700'
            : selectedCategory === 'socialTeenProjects'
            ? 'bg-purple-600'
            : 'bg-gray-500'
        }`}
        onClick={toggleDropdown}
      >
       {getCategoryName(selectedCategory)}
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white rounded-md shadow-lg">
          <button
            className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
            onClick={() => {
              onSelectCategory('all');
              toggleDropdown();
            }}
          >
            All
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
            onClick={() => {
              onSelectCategory('kindergartens');
              toggleDropdown();
            }}
          >
            Kindergartens
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
            onClick={() => {
              onSelectCategory('schools');
              toggleDropdown();
            }}
          >
            Schools
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
            onClick={() => {
              onSelectCategory('socialChildProjects');
              toggleDropdown();
            }}
          >
            Social Child Projects
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
            onClick={() => {
              onSelectCategory('socialTeenProjects');
              toggleDropdown();
            }}
          >
            Social Teen Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
