import os
os.system('pip install requests')
import requests
import json

response = requests.get('https://api.github.com/repos/dada878/blog/git/trees/master')
response = json.loads(response.text)
blogList = []
for item in response['tree']:
    if item['path'].endswith('.md'):
        content = requests.get(f'https://raw.githubusercontent.com/dada878/blog/master/{item["path"]}').text
        title = content.split('\n')[0].replace('# ', '')
        blogList.append({
            'id': item['path'].replace('.md', ''),
            'title': title,
            'content': content,
        })

with open('./public/content/blogs.json', 'w', encoding="UTF8") as f:
    f.write(json.dumps(blogList, indent=4, ensure_ascii=False))