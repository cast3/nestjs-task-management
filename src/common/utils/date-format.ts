const COLOMBIA_LOCALE = 'es-CO';
const COLOMBIA_TIMEZONE = 'America/Bogota';

export type DateFormatPreset = 'default' | 'iso-date-time' | 'short-date';

export type DateFormatOptions = {
  preset?: DateFormatPreset;
  pattern?: string;
};

const dateTimeFormatter = new Intl.DateTimeFormat(COLOMBIA_LOCALE, {
  timeZone: COLOMBIA_TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const patternByPreset: Record<DateFormatPreset, string> = {
  default: 'YYYY-MM-DD HH:mm:ss',
  'iso-date-time': 'YYYY/MM/DD HH:mm:ss',
  'short-date': 'YYYY-MM-DD',
};

const getParts = (value: Date): Map<string, string> => {
  const parts = dateTimeFormatter.formatToParts(value);
  return new Map(parts.map(part => [part.type, part.value]));
};

const formatWithPattern = (value: Date, pattern: string): string => {
  const lookup = getParts(value);

  return pattern
    .replaceAll('YYYY', lookup.get('year') ?? '')
    .replaceAll('MM', lookup.get('month') ?? '')
    .replaceAll('DD', lookup.get('day') ?? '')
    .replaceAll('HH', lookup.get('hour') ?? '')
    .replaceAll('mm', lookup.get('minute') ?? '')
    .replaceAll('ss', lookup.get('second') ?? '');
};

export const formatDateToColombia = (
  value?: Date,
  options: DateFormatPreset | DateFormatOptions = 'default'
): string | null => {
  if (!value) {
    return null;
  }

  const resolvedOptions =
    typeof options === 'string' ? { preset: options } : options;

  if (resolvedOptions.pattern) {
    return formatWithPattern(value, resolvedOptions.pattern);
  }

  const preset = resolvedOptions.preset ?? 'default';
  return formatWithPattern(value, patternByPreset[preset]);
};
