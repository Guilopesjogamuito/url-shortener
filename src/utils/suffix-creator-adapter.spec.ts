import { SuffixCreatorAdapter } from './suffix-creator-adapter';

describe('SuffixCreatorAdapter', () => {
  it('Should create a random suffix of length 5', () => {
    const sut = new SuffixCreatorAdapter();
    const suffix = sut.createSuffix();
    expect(suffix).toHaveLength(5);
    expect(suffix).toMatch(/^[a-zA-Z0-9]{5}$/);
  });
});
