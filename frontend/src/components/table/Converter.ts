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
    this.keys = [...keys.filter((k) => k !== rowHeaderKey)].filter((k) => k);
  }

  text(data: T[]) {
    return `${this.keys.join(this.delimiter)}\n${stringify(
      data.map((d) => {
        delete d[''];
        return d;
      }),
      {
        delimiter: this.delimiter,
      }
    )}`;
  }

  parse(text: string) {
    const data = parse(text, {
      delimiter: this.delimiter,
      columns: true,
      skip_empty_lines: true,
    });
    return data;
  }
}
