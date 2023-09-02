# -*- coding: utf-8 -*-
import json
import urllib.request

# 发送 GET 请求获取 GitHub API 的数据
url = 'https://api.github.com/repos/dada878/blog/git/trees/master'
response = urllib.request.urlopen(url)
data = json.loads(response.read().decode())

# 初始化空白博客列表
blogList = []

# 遍历 GitHub API 的响应数据
for item in data['tree']:
    path = item['path']
    
    # 检查文件是否以 .md 结尾
    if path.endswith('.md'):
        # 发送 GET 请求获取 Markdown 文件的内容
        content_url = "https://raw.githubusercontent.com/dada878/blog/master/" + path
        content_response = urllib.request.urlopen(content_url)
        content = content_response.read().decode()
        
        # 提取标题（假设标题在 Markdown 文件的第一行，以 # 开头）
        title = content.split('\n')[0].replace('# ', '')
        
        # 从文件名中提取 id
        id = path.replace('.md', '')
        
        # 将博客信息添加到博客列表中
        blogList.append({"id": id, "title": title, "content": content})

# 将博客列表转换为 JSON 格式并写入 blogs.json 文件
with open('./blogs.json', 'w', encoding="UTF8") as f:
    json.dump(blogList, f, indent=4, ensure_ascii=False)
