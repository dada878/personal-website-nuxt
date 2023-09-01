interface BlogContent {
  notes: Array<Post>;
}

interface Post {
  id: string;
  title: string;
  content: string;
}

export const useBlogList = async () => {
  const blogListData: Ref<Array<Post>> = useState("blogList");
  if (blogListData.value?.length > 0) return blogListData.value;
  const blogList: Array<Post> = [];

  const response = await (await fetch("https://api.github.com/repos/dada878/blog/git/trees/master")).json();
  for (const item of response.tree) {
    if (item.path.endsWith(".md")) {
      const content = await (await fetch(`https://raw.githubusercontent.com/dada878/blog/master/${item.path}`)).text();
      const title = content.split("\n")[0].replace("# ", "");
      blogList.push({
        id: item.path.replace(".md", ""),
        title,
        content,
      });
    }
  }
  useState("blogList", () => blogList);
  return blogList;
};
