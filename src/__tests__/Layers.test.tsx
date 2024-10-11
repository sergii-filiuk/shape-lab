import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Layers } from '../components/Layers';

test('renders Layers', () => {
  const { container } = render(<Layers />);
  expect(container).toBeInTheDocument();
});
