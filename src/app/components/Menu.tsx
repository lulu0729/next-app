'use client';

import React, { useState } from 'react';

import Link from 'next/link';
interface MenuItem {
  label: string;
  link?: string;
  children?: MenuItem[];
}

interface MenuProps {
  data: MenuItem[];
  firstChild: boolean;
}

const Menu: React.FC<MenuProps> = ({ data, firstChild = true }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(index);
  };

  return (
    <ul className={`${firstChild ? 'relative flex items-center justify-center py-2' : ''}`}>
      {data.map((item, index) => (
        <MenuItemComponent
          key={item.label}
          item={item}
          firstChild={firstChild}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </ul>
  );
};

interface MenuItemProps {
  item: MenuItem;
  firstChild: boolean;
  isOpen: boolean;
  onClick: () => void;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ item, firstChild = false, isOpen, onClick }) => {
  const { label, link, children } = item;
  const hasChildren = children?.length;

  const buttonStyle = "inline-flex justify-center w-full border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none";

  const handleClick = () => {
    onClick();
  };

  return (
    <li className="w-48 relative">
      {link ? (
        <Link href={link} className={buttonStyle}>{label}</Link>
      ) : (
        <button onClick={handleClick} className={buttonStyle}>{label}</button>
      )}
      {hasChildren && isOpen && (
        <div className={`${firstChild ? 'mr-10' : '-right-48 top-0'} absolute  rounded-md shadow-sm`}>
          <Menu data={children!!} firstChild={false} />
        </div>
      )}
    </li>
  );
};

export default Menu;