import { URLController } from '../../presentation/controllers/url/URLController';
import { SuffixCreatorAdapter } from '../../utils/suffix-creator-adapter';
import { DbAddURL } from '../../data/use-cases/add-url/db-add-url';
import { URLMongoRepository } from '../../infra/db/mongodb/url-repository/url';

export const makeUrlController = (): URLController => {
  const suffixCreator = new SuffixCreatorAdapter();
  const repo = new URLMongoRepository();
  const dbAddUrl = new DbAddURL(repo);
  const urlController = new URLController(suffixCreator, dbAddUrl);
  return urlController;
};
