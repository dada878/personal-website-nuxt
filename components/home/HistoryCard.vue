<template>
  <section>
    <h2>個人經歷</h2>
    <div class="step">
      <div class="stepper">
        <div class="circle"></div>
        <div class="line"></div>
      </div>
      <div class="content">
        <p>高中</p>
        <p>- APCS 檢定實作題 5 級分</p>
        <p>- ISSC 青年程式競賽銅獎</p>
        <p>- HP Codewars 高中組第 4 名</p>
        <p>- Codeforces Rank: Specialist</p>
        <p>- CPE 檢定 6 題 (PR 98)</p>
        <p>- 資訊奧林匹亞新手同好會個人賽第 2 名</p>
        <p>- 虎尾 Python 程式設計競賽第 10 名</p>
        <p>- YTP 少年圖靈計畫入圍決賽</p>
        <p>- ITSA 檢定 1 小時破台</p>
        <p>- SCINT 北台灣學生資訊社群行政組</p>
        <p>- SITCON 2024 開發組</p>
        <p>- 銘傳大學 APCS 暑訓助教</p>
        <p>- Hour of Code 雲林場助教</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.step {
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: flex-start;

  .stepper {
    position: relative;

    .circle {
      background-color: rgb(209, 209, 209);
      border: 3px solid gray;
      border-radius: 100%;
      width: 20px;
      height: 20px;
      display: inline-block;
      visibility: visible;
      border-color: rgb(140, 143, 145);
    }

    .line {
      top: 23px;
      left: 12px;
      height: 100%;
      position: absolute;
      border-left: 3px solid gray;
      border-left: 3px solid rgb(140, 143, 145);
    }
  }

  .content {
    padding-top: 3px;

    p {
      text-align: left;
      margin-top: 1rem;
      margin-bottom: 0rem;

      &:nth-child(1) {
        font-weight: bold;
        margin: 0rem;
      }
    }
  }
}
</style>
