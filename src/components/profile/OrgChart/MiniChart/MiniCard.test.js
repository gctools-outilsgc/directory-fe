import MiniCard from './MiniCard';

describe('MiniCard', () => {
  describe('renders', () => {
    test('at the correct position', () => {
      const position = { x: 40, y: 100 };
      const card = MiniCard({ position });
      expect(card.props.style.top).toBe(position.y);
      expect(card.props.style.left).toBe(position.x);
    });
    test('using the correct sizes', () => {
      const width = 10;
      const height = 10;
      const card = MiniCard({ width, height });
      expect(card.props.style.width).toBe(`${width}px`);
      expect(card.props.style.height).toBe(`${height}px`);
    });
    test('adds classes when active or blurred', () => {
      const card1 = MiniCard({});
      const card2 = MiniCard({ active: true });
      const card3 = MiniCard({ blurred: true });
      const card4 = MiniCard({ active: true, blurred: true });
      expect(card1.props.className).not.toEqual(card2.props.className);
      expect(card2.props.className).not.toEqual(card3.props.className);
      expect(card3.props.className).not.toEqual(card4.props.className);
      expect(card1.props.className.split(' ').length).toBe(1);
      expect(card2.props.className.split(' ').length).toBe(2);
      expect(card3.props.className.split(' ').length).toBe(2);
      expect(card4.props.className.split(' ').length).toBe(3);
    });
  });
});
