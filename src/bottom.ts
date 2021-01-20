const chars: Array<[number, string]> = [
   [200, "🫂"],
   [50, "💖"],
   [10, "✨"],
   [5, "🥺"],
   [1, ","],
];
const zero: [number, string] = [0, "❤️"]

const seperator = "👉👈";

const encodebyte_recurse = (byte: number): string => {
   const found: [number, string] | undefined = chars.find(val => val[0] <= byte);
   return found !== undefined ? (
      Math.abs(found[0]) === found[0]
      ? found[1] + encodebyte_recurse(byte - found[0])
      : found[1]
   ) : "";
};

const encodebyte = (byte: number): string =>
   byte === 0 ? zero[1] : encodebyte_recurse(byte);

export const encode = (str: string): string =>
   [...str]
      .map(val => encodebyte(val.charCodeAt(0)) + seperator)
      .reduce((val, other) => val + other, "");

const decodechar = (str: string): string => String.fromCharCode(
   [...str]
      .map(char => char.charCodeAt(0))
      .reduce((val, other) => val + other, 0)
);

export const decode = (str: string): string =>
   str.replace(new RegExp(`^${seperator}|${seperator}$`, "g"), "")
      .split(seperator)
      .map(decodechar)
      .reduce((val, other) => val + other, "");
