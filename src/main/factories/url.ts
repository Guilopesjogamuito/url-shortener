import { AddURLController } from '../../presentation/controllers/url/add-url-controller';
import { SuffixCreatorAdapter } from '../../utils/suffix-creator-adapter';
import { DbAddURL } from '../../data/use-cases/add-url/db-add-url';
import { URLMongoRepository } from '../../infra/db/mongodb/url-repository/url';

export const makeAddUrlController = (): AddURLController => {
  const suffixCreator = new SuffixCreatorAdapter();
  const repo = new URLMongoRepository();
  const dbAddUrl = new DbAddURL(repo);
  const urlController = new AddURLController(suffixCreator, dbAddUrl);
  return urlController;
};
