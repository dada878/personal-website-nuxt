import os
import re
import urllib.request
import hashlib
import json

categories = os.listdir('./content/original/blogs/')

blogList = []
images = []

website_url = "https://dada878.com"
base_url = "./content"

re_image = re.compile(r'!\[.*?\]\((.*?)\)')

def download_image(url, path):
    urllib.request.urlretrieve(url, path)

def compile_image(content):
    for blog in content:
        current_images = re_image.findall(blog['content'])
        for image in current_images:
            hash_id = hashlib.md5(image.encode('utf-8')).hexdigest()
            image_path = "/uploads/" + hash_id + ".png"
            download_image(image, "./public" + image_path)
            blog['content'] = blog['content'].replace(image, website_url + image_path)

for category in categories:
    posts = os.listdir(f'./content/original/blogs/{category}')
    for post in posts:
        with open(f'./content/original/blogs/{category}/{post}', 'r') as f:
            if not post.endswith('.md'):
                continue
            content = f.read()
            title = content.split('\n')[0].replace('# ', '')
            pageID = post.split('.')[0]
            page_data = {
                "id": pageID,
                "title": title,
                "content": content,
                "category": category,
                "date": "2024 / 01 / 01"
            }
            blogList.append(page_data)

with open(base_url+'/blogs.json', 'w', encoding="UTF8") as f:
    json.dump(blogList, f, indent=4, ensure_ascii=False)