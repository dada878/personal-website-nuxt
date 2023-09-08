import projects from "@/content/projects.json";

export const useProjectList = () => {
  return projects.map((item) => ({
    ...item,
    category: item.category ?? "未分類",
  }));
};
