type MakeProps = {
  linebreak?: string;
  indent?: string;
  shortArraySyntax?: boolean;
  stripSpaces?: boolean;
};

const make = (props: MakeProps = {}) => {
  const linebreak = props.linebreak ?? '';
  const indent = props.indent ?? '';
  const stripSpaces = props.stripSpaces ?? false;
  const shortArraySyntax = props.shortArraySyntax ?? false;
  const arrOpen = shortArraySyntax ? '[' : 'array(';
  const arrClose = shortArraySyntax ? ']' : ')';
  const arrow = stripSpaces ? '=>' : ' => ';

  return function transform(obj: unknown, parentIndent = ''): string {
    switch (typeof obj) {
      case 'undefined':
        return 'null';
      case 'number':
      case 'boolean':
        return obj.toString();
      case 'string':
        return `'${obj.replace(/\\/g, '\\\\').replace(/\'/g, "\\'")}'`;
      case 'object':
        if (obj === null) return 'null';
        const nestIndent = parentIndent + indent;
        const items = Array.isArray(obj)
          ? obj.map((item) => transform(item, nestIndent))
          : Object.entries(obj).map(([key, value]) => {
              return `${transform(key, nestIndent)}${arrow}${transform(value, nestIndent)}`;
            });
        const itemStr = items.join(`,${linebreak === '' && !stripSpaces ? ' ' : linebreak + nestIndent}`);
        return `${arrOpen}${linebreak + nestIndent}${itemStr}${linebreak + parentIndent}${arrClose}`;
      default:
        return 'null';
    }
  };
};

const json2php = make() as ReturnType<typeof make> & { make: typeof make };
json2php.make = make;

export default json2php;
