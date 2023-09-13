import json
import urllib.request
import urllib.parse  # Import urllib.parse for URL encoding
import re
import hashlib

url = 'https://api.github.com/repos/dada878/blog/git/trees/master?recursive=3'
response = urllib.request.urlopen(url)
data = json.loads(response.read().decode('utf-8'))

blogList = []
projectList = []

for item in data['tree']:
    path = item['path']
    
    if path.endswith('.md'):
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

base_url = "./content"
website_url = "https://dada878.tk"

def download_image(url, path):
    urllib.request.urlretrieve(url, path)

images = []
re_image = re.compile(r'!\[.*?\]\((.*?)\)')
for blog in blogList:
    current_images = re_image.findall(blog['content'])
    for image in current_images:
        hash_id = hashlib.md5(image.encode('utf-8')).hexdigest()
        image_path = "/images/" + hash_id + ".png"
        download_image(image, "./public" + image_path)
        blog['content'] = blog['content'].replace(image, website_url + image_path)

with open(base_url+'/blogs.json', 'w', encoding="UTF8") as f:
    json.dump(blogList, f, indent=4, ensure_ascii=False)

with open(base_url+'/projects.json', 'w', encoding="UTF8") as f:
    json.dump(projectList, f, indent=4, ensure_ascii=False)