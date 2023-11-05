'use client';

import { fireEvent, render, screen } from '@testing-library/react';

import Menu from '@/components/Menu';
import React from 'react';
import userEvent from '@testing-library/user-event';

// Mock menu data
const menuData = [
  {
    label: 'Item 1',
    link: '/item1',
  },
  {
    label: 'Item 2',
    children: [
      {
        label: 'Child 1',
        link: '/child1',
      },
      {
        label: 'Child 2',
        link: '/child2',
      },
    ],
  },
];

describe('Menu', () => {

  test('renders menu items correctly', () => {
    render(<Menu data={menuData} />);

    const item1 = screen.getByText('Item 1');
    const item2 = screen.getByText('Item 2');
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });
  test('renders submenu on hover correctly', () => {
    const data = [
      {
        label: 'Menu 1',
        children: [
          {
            label: 'login',
            link: '/login',
          },
          {
            label: 'Submenu 1.2',
            children: [
              {
                label: 'Submenu 1.2.1',
                link: '/login',
              },
              {
                label: 'Submenu 1.2.2',
                link: '/login',
              },
            ],
          },
        ],
      },
      {
        label: 'Menu 2',
        link: '/menu2',
      },
    ];
    render(<Menu data={data} />);
    const menu1 = screen.getByText('Menu 1');
    fireEvent.mouseEnter(menu1);
    const menuChildren1 = screen.getAllByTestId('menu-children');
    expect(menuChildren1[0]).toBeInTheDocument();
    expect(menuChildren1[0]).toHaveClass('mr-10 absolute rounded-md shadow-sm');
    const subMenu1 = screen.getByText('Submenu 1.2');
    fireEvent.mouseEnter(subMenu1);
    const subMenuChildren1 = screen.getAllByTestId('menu-children');
    expect(subMenuChildren1[1]).toBeInTheDocument();
    expect(subMenuChildren1[1]).toHaveClass('-right-48 top-0 absolute rounded-md shadow-sm');
  });
  test('opens submenu on click', async () => {
    render(<Menu data={menuData} />);

    // Check if submenu is initially closed
    expect(screen.queryByText('Child 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Child 2')).not.toBeInTheDocument();

    // Click on the menu item to open the submenu
    await userEvent.click(screen.getByText('Item 2'));

    // Check if submenu is now open
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
  test('opens submenu on hover', async () => {
    const data = [
      { label: 'Item 1', link: '/item1' },
      { label: 'Item 2', children: [{ label: 'Subitem 1', link: '/subitem1' }] },
    ];
    render(<Menu data={data} />);

    const item2 = screen.getByText('Item 2');
    fireEvent.mouseEnter(item2);
    const subitem1 = screen.getByText('Subitem 1');
    expect(subitem1).toBeInTheDocument();
    fireEvent.mouseLeave(item2);
    expect(subitem1).not.toBeInTheDocument();
  });
});