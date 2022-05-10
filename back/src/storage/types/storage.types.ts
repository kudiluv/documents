import { GoogleService } from '../google/google.service';
import { LocalService } from '../local/local.service';
import { YandexService } from '../yandex/yandex.service';

export const StorageServices = {
  yandex: YandexService,
  google: GoogleService,
  local: LocalService,
};
export type StorageTypes = keyof typeof StorageServices;
