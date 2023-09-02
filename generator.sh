JQ_PATH="$HOME/bin/jq"

# 檢查jq是否已安裝，如果未安裝則下載和安裝它
if [ ! -x "$JQ_PATH" ]; then
  echo "jq is not installed, downloading and installing..."
  mkdir -p "$HOME/bin"
  curl -L -o "$JQ_PATH" "https://github.com/stedolan/jq/releases/download/jq-3.1/jq-linux64"
  chmod +x "$JQ_PATH"
  echo "jq is installed at $JQ_PATH"
fi

# 使用curl發送GET請求獲取GitHub API的數據
response=$(curl -s 'https://api.github.com/repos/dada878/blog/git/trees/master')

# 解析JSON響應
tree=$("$JQ_PATH" -r '.tree[]' <<< "$response")

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
echo "[${blogList[*]}]" | "$JQ_PATH" '.' > ./blogs.json