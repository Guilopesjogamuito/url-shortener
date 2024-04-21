import { SuffixValidator } from '../presentation/protocols/suffix-validator';

export class SuffixValidatorAdapter implements SuffixValidator {
  isValid(suffix: string): boolean {
    const regEx = /^[a-zA-Z0-9]{5}$/;
    return regEx.test(suffix);
  }
}
