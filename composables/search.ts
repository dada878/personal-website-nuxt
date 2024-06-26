import blogs from "@/content/blogs.json";

const pages: Array<Post> = [
  ...blogs.map((item) => ({
    ...item,
    url: `/blogs/${item.id}`,
  })),
];

function longestCommonSubstring(s1: string, s2: string) {
  const dp: Array<Array<number>> = Array.from({ length: s1.length + 1 }, () =>
    Array.from({ length: s2.length + 1 }, () => 0)
  );
  let max = 0;
  let endIndex = 0;
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > max) {
          max = dp[i][j];
          endIndex = i;
        }
      }
    }
  }
  return s1.substring(endIndex - max, endIndex).length;
}

export const useSearch = () => {
  return {
    query(
      queryKeyword?: string,
      resultCount: number = 5,
      mustMatch: boolean = false,
    ) {
      if (typeof queryKeyword != "string") return [];
      const keyword = queryKeyword?.toLowerCase()?.trim();
      const filteredPages = mustMatch
        ? pages.filter(
            (page) =>
              page.title.toLowerCase().includes(keyword) ||
              page.content.toLowerCase().includes(keyword)
          )
        : pages;
      return filteredPages
        .sort((a, b) => {
          const aSubstringLength =
            longestCommonSubstring(a.title.toLowerCase(), keyword);
          const bSubstringLength =
            longestCommonSubstring(b.title.toLowerCase(), keyword);
          return bSubstringLength - aSubstringLength;
        })
        .slice(0, resultCount).sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    },
  };
};
