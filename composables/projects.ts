interface Post {
  id: string;
  title: string;
  content: string;
  category: string | null;
}

export const useProjectList = async () => {
  const blogData : Array<Post> = useState("projects").value as Array<Post>;
  if (blogData) return blogData;
  const requestUrl = useRequestURL();
  const url = `${requestUrl.protocol}//${requestUrl.host}/content/projects.json`;
  const response : Array<Post> = await(await fetch(url)).json();
  useState("projects", () => response);
  return response;
};
