interface Post {
  id: string;
  title: string;
  content: string;
  category: string | null;
}

export const useBlogList = async () => {
  const blogData : Array<Post> = useState("blogs").value as Array<Post>;
  if (blogData) return blogData;
  const requestUrl = useRequestURL();
  const url = `${requestUrl.protocol}//${requestUrl.host}/content/blogs.json`;
  const response : Array<Post> = await(await fetch(url)).json();
  useState("blogs", () => response);
  return response;
};
