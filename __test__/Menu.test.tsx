'use client';

import { render, screen } from '@testing-library/react';

import Menu from '@/app/components/Menu';
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
    render(<Menu data={menuData} firstChild={true} />);

    // Check if menu items are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('opens submenu on click', async () => {
    render(<Menu data={menuData} firstChild={true} />);

    // Check if submenu is initially closed
    expect(screen.queryByText('Child 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Child 2')).not.toBeInTheDocument();

    // Click on the menu item to open the submenu
    await userEvent.click(screen.getByText('Item 2'));

    // Check if submenu is now open
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});