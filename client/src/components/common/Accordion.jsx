import React, { useState } from 'react';
import 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\styles\accordion.css';

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="accordion-item">
      <button 
        className="accordion-header"
        aria-expanded={isOpen}
        onClick={onClick}
      >
        <span className="accordion-title">{item.title}</span>
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div 
        className={`accordion-content ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="accordion-body">
          {item.content}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openItemId, setOpenItemId] = useState(null);

  const toggleItem = (itemId) => {
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

  return (
    <div className="accordion">
      {items.map(item => (
        <AccordionItem 
          key={item.id}
          item={item}
          isOpen={openItemId === item.id}
          onClick={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
};

export default Accordion;
