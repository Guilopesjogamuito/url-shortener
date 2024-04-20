import { SuffixCreator } from '../presentation/protocols/suffix-creator';

export class SuffixCreatorAdapter implements SuffixCreator {
  createSuffix(): string {
    const possibleChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let suffix = '';
    for (let i = 0; i < 5; i++) {
      let rand = Math.floor(Math.random() * possibleChars.length);
      suffix += possibleChars[rand];
    }
    return suffix;
  }
}
