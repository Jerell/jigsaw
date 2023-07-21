import { parse, stringify } from 'csv/sync';

export default class Converter<T extends Record<string, any>> {
  public keys: string[];

  constructor(
    keys: string[],
    public readonly rowHeaderKey?: string,
    public readonly delimiter = '\t'
  ) {
    if (rowHeaderKey) {
      keys.unshift(rowHeaderKey);
    }
    this.keys = [...keys.filter((k) => k !== rowHeaderKey)];
  }

  text(data: T[]) {
    const delimiter = '\t';
    return `${this.keys.join(delimiter)}\n${stringify(data, { delimiter })}`;
  }

  parse(text: string) {
    const delimiter = '\t';
    const data = parse(text, {
      delimiter,
      columns: true,
      skip_empty_lines: true,
    });
    return data;
  }
}
