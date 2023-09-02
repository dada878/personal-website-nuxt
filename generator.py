import json
import urllib.request
import urllib.parse  # Import urllib.parse for URL encoding
import sys
first_build = sys.argv[1] == 'true'

url = 'https://api.github.com/repos/dada878/blog/git/trees/master?recursive=3'
response = urllib.request.urlopen(url)
data = json.loads(response.read().decode('utf-8'))

blogList = []
projectList = []

for item in data['tree']:
    path = item['path']
    
    if path.endswith('.md'):
        # Encode the URL
        content_url = urllib.parse.quote("https://raw.githubusercontent.com/dada878/blog/master/" + path, safe=':/')
        content_response = urllib.request.urlopen(content_url)
        content = content_response.read().decode('utf-8')
        
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

base_url = "./public/content" if first_build else "./content"

with open(base_url+'/blogs.json', 'w', encoding="UTF8") as f:
    json.dump(blogList, f, indent=4, ensure_ascii=False)

with open(base_url+'/projects.json', 'w', encoding="UTF8") as f:
    json.dump(projectList, f, indent=4, ensure_ascii=False)
