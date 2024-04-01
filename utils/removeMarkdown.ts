export function removeMarkdown(str: string) {
  // remove links
  str = str.replace(/https?:\/\/\S+/g, "");
  str = str.replace(/http?:\/\/\S+/g, "");
  // remove titles
  str = str.replace(/#+.+/g, "");
  // remove symbols
  const symbols = "#*_`![]()<>&/\\\n$".split("");
  for (const symbol of symbols) {
    str = str.replaceAll(symbol, "");
  }
  return str;
}
