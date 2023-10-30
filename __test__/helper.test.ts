import { validateForm } from '@/app/login/helper';
// import validator from 'validator';

// jest.mock('validator');

describe('validateForm', () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  it('should return empty array when both username and password are provided', () => {
    const result = validateForm({ username: 'test', password: 'password' });
    expect(result).toEqual([]);
  });
});