import os
import json

os.system("pip install requests")
import requests

url = 'https://api.github.com/repos/dada878/blog/git/trees/master?recursive=3'
response = requests.get(url)
data = response.json()

blogList = []
projectList = []

for item in data['tree']:
    path = item['path']
    
    if path.endswith('.md'):
        content_url = "https://raw.githubusercontent.com/dada878/blog/master/" + path
        content_response = requests.get(content_url)
        content = content_response.text
        
        title = content.split('\n')[0].replace('# ', '')
        
        page_id = path.split("/")[-1].replace('.md', '')
        
        category = path.split("/")[-2] if len(path.split("/")) >= 3 else None
        
        page_data = {
            "id": page_id,
            "title": title,
            "content": content,
            "category": category,
        }
        
        if path.startswith('projects/'):
            projectList.append(page_data)
            
        elif path.startswith('blogs/'):
            blogList.append(page_data)

with open('./content/blogs.json', 'w', encoding="UTF8") as f:
    json.dump(blogList, f, indent=4, ensure_ascii=False)

with open('./content/projects.json', 'w', encoding="UTF8") as f:
    json.dump(projectList, f, indent=4, ensure_ascii=False)
