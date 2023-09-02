#!/bin/bash

# 使用curl发送GET请求获取GitHub API的数据，并将结果存储在临时文件中
curl -s 'https://api.github.com/repos/dada878/blog/git/trees/master' > temp.json

# 初始化空白博客列表
blogList=()

# 从临时文件中逐行读取JSON数据并解析
while read -r line; do
  # 使用Bash内置的功能来解析JSON字段
  path=$(echo "$line" | grep -o '"path": "[^"]*' | cut -d'"' -f4)
  
  # 检查文件是否以.md结尾
  if [[ "$path" == *.md ]]; then
    # 使用curl发送GET请求获取Markdown文件的内容，并将结果存储在临时文件中
    curl -s "https://raw.githubusercontent.com/dada878/blog/master/$path" > temp_content.txt
    
    # 提取标题（假设标题在Markdown文件的第一行，以#开头）
    title=$(grep -o '^# [^#]*' temp_content.txt | cut -d' ' -f2-)
    
    # 从文件名中提取id
    id=$(basename "$path" .md)
    
    # 读取文件内容并转义特殊字符
    content=$(cat temp_content.txt | jq -s -R -r @uri)
    
    # 将博客信息添加到博客列表中
    blogList+=("{\"id\": \"$id\", \"title\": \"$title\", \"content\": \"$content\"}")
    
    # 删除临时文件
    rm temp_content.txt
  fi
done < temp.json

# 将博客列表转换为JSON格式并写入blogs.json文件
echo "[${blogList[*]}]" > ./blogs.json

# 删除临时文件
rm temp.json
