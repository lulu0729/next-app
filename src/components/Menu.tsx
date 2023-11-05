'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

interface MenuItem {
  label: string;
  link?: string;
  children?: MenuItem[];
}

interface MenuProps {
  data: MenuItem[];
  firstChild?: boolean;
}

const MenuWrapper: React.FC<MenuProps> = ({ data, firstChild }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleMouseEnter = (index: number) => {
    setOpenIndex(index);
  };

  const handleMouseLeave = () => {
    setOpenIndex(null);
  };

  useEffect(() => {
    const menuElement = menuRef.current;
    if (menuElement) {
      menuElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (menuElement) {
        menuElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <ul ref={menuRef} className={`${firstChild ? 'relative flex items-center justify-center py-2' : ''}`}>
      {data.map((item, index) => (
        <MenuItemComponent
          key={item.label}
          item={item}
          firstChild={firstChild!!}
          isOpen={openIndex === index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseleave={() => handleMouseLeave()}
        />
      ))}
    </ul>
  );
};

interface MenuItemProps {
  item: MenuItem;
  firstChild: boolean;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseleave: () => void;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ item, firstChild, isOpen, onMouseEnter, onMouseleave }) => {
  const { label, link, children } = item;
  const hasChildren = children?.length;

  const buttonStyle = "inline-flex justify-center w-full border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none";

  return (
    <li
      className={`${firstChild ? 'mr-10' : ''} w-48 relative`}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseleave()}>
    {link ? (
      <Link
        href={link}
        className={buttonStyle}
      >{label}</Link>
    ) : (
      <button
        className={buttonStyle}
      >
        {label}
      </button>
    )}
    {hasChildren && isOpen && (
      <div
        data-testid="menu-children"
        className={`${firstChild ? 'mr-10' : '-right-48 top-0'} absolute  rounded-md shadow-sm`}>
        <MenuWrapper data={children!!} firstChild={false} />
      </div>
    )}
  </li>
  );
};
const Menu: React.FC<MenuProps> = ({ data }) => {
  return (
    <MenuWrapper data={data} firstChild={true} />
  );
};
export default Menu;