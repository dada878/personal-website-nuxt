# 使用curl發送GET請求獲取GitHub API的數據
response=$(curl -s 'https://api.github.com/repos/dada878/blog/git/trees/master')

# 解析JSON響應
tree=$(echo "$response" | jq -r '.tree[]')

# 初始化空白博客列表
blogList=()

# 遍歷GitHub API的響應
for item in $tree; do
    path=$(echo "$item" | jq -r '.path')
    
    # 檢查文件是否以.md結尾
    if [[ "$path" == *.md ]]; then
        # 使用curl發送GET請求獲取Markdown文件的內容
        content=$(curl -s "https://raw.githubusercontent.com/dada878/blog/master/$path")
        
        # 提取標題（假設標題在Markdown文件的第一行，以#開頭）
        title=$(echo "$content" | sed -n '1s/# //p')
        
        # 從文件名中提取id
        id=$(basename "$path" .md)
        
        # 將博客信息添加到博客列表中
        blogList+=("{\"id\": \"$id\", \"title\": \"$title\", \"content\": \"$content\"}")
    fi
done

# 將博客列表轉換為JSON格式並寫入blogs.json文件
echo "[${blogList[*]}]" | jq '.' > ./blogs.json