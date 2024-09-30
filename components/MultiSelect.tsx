import React, {useState, useRef, useEffect} from 'react';
export const MultiSelect = ({options, selected, setSelected}) => {
  const [isOpen, setIsOpen] = useState(false);
  // toggle dropdown
  const toggle = () => setIsOpen(!isOpen);
  const optionsDiv = useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event) => {
    if (optionsDiv.current && !optionsDiv.current.contains(event.target)) {
      setIsOpen(false);
    }
  }
  // handle selection
  const handleSelect = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  }

  return (
    <div className="relative w-36" ref={optionsDiv}>
      <div
        className="bg-gray-200 block rounded-lg mt-2 px-4 py-1.5 cursor-pointer shadow-sm focus:outline-none focus:ring focus:border-blue-500 overflow-hidden"
        onClick={toggle}
      >
        <span className="text-gray-700">
          {selected.length > 0 ? selected[0]  : 'Auto'}
        </span>
      <div className="flex absolute bg-gray-200 px-1.5 h-full right-0 top-0 align-center rounded-r-lg">
        <span className="m-auto float-right text-gray-700">
          {isOpen ? '▲' : '▼'}
        </span>
      </div>
      </div>
      {isOpen && (
        <div  
        className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <label
              key={option.id}
              className="block p-2 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selected.includes(option.id)}
                onChange={() => handleSelect(option.id)}
              />
              {option.name || option.id}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
