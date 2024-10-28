import { nl, enUS, srLatn } from 'date-fns/locale';
import { Language } from 'src/i18n/language';

export interface CultureInfo {
  datePipeFormat: string;
  matDateFormat: string;
  matDateLocale: Locale;
}

export const cultures: Record<Language, CultureInfo> = {
  en: {
    datePipeFormat: 'EEEE, MMMM d, yyyy',
    matDateFormat: 'MM/dd/yyyy',
    matDateLocale: enUS
  },
  nl: {
    datePipeFormat: 'EEEE, d MMMM yyyy',
    matDateFormat: 'dd-MM-yyyy',
    matDateLocale: nl
  },
  srLatn: {
    datePipeFormat: 'EEEE, d. MMMM yyyy.',
    matDateFormat: 'dd.MM.yyyy',
    matDateLocale: srLatn
  }
};
