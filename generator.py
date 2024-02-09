import json
import urllib.request
import urllib.parse  # Import urllib.parse for URL encoding
import re
import hashlib
import datetime
import os

# create folders
os.makedirs('./content', exist_ok=True)
os.makedirs('./public/uploads', exist_ok=True)

url = 'https://api.github.com/repos/dada878/blog/git/trees/master?recursive=3'
response = urllib.request.urlopen(url)
data = json.loads(response.read().decode('utf-8'))

blogList = []
projectList = []

for item in data['tree']:
    path = item['path']
    
    if path.endswith('.md'):
        content_url = urllib.parse.quote("https://raw.githubusercontent.com/dada878/blog/master/" + path, safe=':/')
        detail_url = urllib.parse.quote("https://api.github.com/repos/dada878/blog/commits?path=" + path + "&page=1&per_page=1", safe=':/?&=')
        content_response = urllib.request.urlopen(content_url)
        detail_response = urllib.request.urlopen(detail_url)
        content = content_response.read().decode('utf-8')
        detail = json.loads(detail_response.read().decode('utf-8'))
        date = detail[0]['commit']['committer']['date']
        formatted_date = datetime.datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ').strftime('%Y / %m / %d')
        
        title = content.split('\n')[0].replace('# ', '')
        
        page_id = path.split("/")[-1].replace('.md', '')
        
        category = path.split("/")[-2] if len(path.split("/")) >= 3 else None
        
        page_data = {
            "id": page_id,
            "title": title,
            "content": content,
            "category": category,
            "date": formatted_date
        }
        
        # if path.startswith('projects/'):
        #     projectList.append(page_data)
            
        if path.startswith('blogs/'):
            blogList.append(page_data)
            
base_url = "./content"
website_url = "https://dada878.com"

def download_image(url, path):
    urllib.request.urlretrieve(url, path)
    
def get_update_date(url):
    pass

images = []
re_image = re.compile(r'!\[.*?\]\((.*?)\)')

def compile_image(content):
    for blog in content:
        current_images = re_image.findall(blog['content'])
        for image in current_images:
            hash_id = hashlib.md5(image.encode('utf-8')).hexdigest()
            image_path = "/uploads/" + hash_id + ".png"
            download_image(image, "./public" + image_path)
            blog['content'] = blog['content'].replace(image, website_url + image_path)
            
compile_image(blogList)
compile_image(projectList)

with open(base_url+'/blogs.json', 'w', encoding="UTF8") as f:
    json.dump(blogList, f, indent=4, ensure_ascii=False)

with open(base_url+'/projects.json', 'w', encoding="UTF8") as f:
    json.dump(projectList, f, indent=4, ensure_ascii=False)