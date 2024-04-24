import { clearPgMem, setupPgMem } from '../helpers/setup-pg-mem';
import { URLPostgresRepository } from './url';

describe('URL Postgresql Repository', () => {
  beforeAll(async () => {
    await setupPgMem();
  });
  afterEach(async () => {
    await clearPgMem();
  });
  afterAll(async () => {});
  beforeEach(async () => {});

  it('Should return an URL on creation success', async () => {
    const sut = new URLPostgresRepository();
    const url = await sut.add({
      originalURL: 'test',
      suffix: 'test',
    });
    expect(url).toBeTruthy();
    expect(url.originalURL).toBe('test');
    expect(url.suffix).toBe('test');
    expect(url.createdAt).toBeTruthy();
    expect(url.expiresAt).toBeTruthy();
  });

  it('Should return null on load not found', async () => {
    const sut = new URLPostgresRepository();
    const url = await sut.load('test');
    expect(url).toBeNull();
  });

  it('Should return an URL on load success', async () => {
    const sut = new URLPostgresRepository();
    await sut.add({
      originalURL: 'test',
      suffix: 'suffix',
    });
    const url = await sut.load('suffix');
    expect(url).toBeTruthy();
    expect(url?.originalURL).toBe('test');
    expect(url?.suffix).toBe('suffix');
  });
});
