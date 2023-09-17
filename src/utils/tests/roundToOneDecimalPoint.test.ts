import { roundToOneDecimalPoint } from '../../utils';

describe('roundToOneDecimalPoint function', () => {
  it('should round a number to one decimal point', () => {
    expect(roundToOneDecimalPoint(12.323232)).toEqual(12.3);
    expect(roundToOneDecimalPoint(12.1)).toEqual(12.1);
    expect(roundToOneDecimalPoint(42)).toEqual(42.0);
  });
});
