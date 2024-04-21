import { AddURLController } from '../../presentation/controllers/url/add-url-controller';
import { LoadURLController } from '../../presentation/controllers/url/load-url-controller';
import { SuffixCreatorAdapter } from '../../utils/suffix-creator-adapter';
import { DbAddURL } from '../../data/use-cases/add-url/db-add-url';
import { URLMongoRepository } from '../../infra/db/mongodb/url-repository/url';
import { SuffixValidatorAdapter } from '../../utils/suffix-validator-adapter';
import { DbLoadURLBySuffix } from '../../data/use-cases/load-url-by-suffix/db-load-url-by-suffix';
const repo = new URLMongoRepository();

export const makeAddUrlController = (): AddURLController => {
  const suffixCreator = new SuffixCreatorAdapter();
  const dbAddUrl = new DbAddURL(repo);
  const urlController = new AddURLController(suffixCreator, dbAddUrl);
  return urlController;
};

export const makeLoadUrlBySuffixController = (): LoadURLController => {
  const suffixValidator = new SuffixValidatorAdapter();
  const dbLoadURLBySuffix = new DbLoadURLBySuffix(repo);
  const urlController = new LoadURLController(suffixValidator, dbLoadURLBySuffix);
  return urlController;
};
