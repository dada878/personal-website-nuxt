<template>
  <div class="blog-post">
      <div class="content">
          <h1>{{ message }} Lorem ipsum dolor sit.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores et quisquam iste labore aut repellendus, nobis nisi, aperiam consequuntur, numquam sit consequatur quam nam tempore unde eius optio. Voluptates, accusantium quibusdam nihil exercitationem architecto consequatur excepturi, mollitia error odit delectus incidunt. Dolorem, eaque! Veniam sed exercitationem temporibus dolorem voluptates ab voluptatum nihil soluta quisquam, omnis repellendus eveniet? Minus ab neque, rerum totam ullam quod ipsum. Modi unde nostrum, ipsa odit perspiciatis nisi id quasi, officiis necessitatibus cumque ullam! Quos aliquid consequatur reiciendis similique, maxime distinctio consequuntur asperiores doloremque? Amet ex blanditiis tenetur provident, vitae officia odio temporibus ipsa obcaecati magni.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores et quisquam iste labore aut repellendus, nobis nisi, aperiam consequuntur, numquam sit consequatur quam nam tempore unde eius optio. Voluptates, accusantium quibusdam nihil exercitationem architecto consequatur excepturi, mollitia error odit delectus incidunt. Dolorem, eaque! Veniam sed exercitationem temporibus dolorem voluptates ab voluptatum nihil soluta quisquam, omnis repellendus eveniet? Minus ab neque, rerum totam ullam quod ipsum. Modi unde nostrum, ipsa odit perspiciatis nisi id quasi, officiis necessitatibus cumque ullam! Quos aliquid consequatur reiciendis similique, maxime distinctio consequuntur asperiores doloremque? Amet ex blanditiis tenetur provident, vitae officia odio temporibus ipsa obcaecati magni.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores et quisquam iste labore aut repellendus, nobis nisi, aperiam consequuntur, numquam sit consequatur quam nam tempore unde eius optio. Voluptates, accusantium quibusdam nihil exercitationem architecto consequatur excepturi, mollitia error odit delectus incidunt. Dolorem, eaque! Veniam sed exercitationem temporibus dolorem voluptates ab voluptatum nihil soluta quisquam, omnis repellendus eveniet? Minus ab neque, rerum totam ullam quod ipsum. Modi unde nostrum, ipsa odit perspiciatis nisi id quasi, officiis necessitatibus cumque ullam! Quos aliquid consequatur reiciendis similique, maxime distinctio consequuntur asperiores doloremque? Amet ex blanditiis tenetur provident, vitae officia odio temporibus ipsa obcaecati magni.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores et quisquam iste labore aut repellendus, nobis nisi, aperiam consequuntur, numquam sit consequatur quam nam tempore unde eius optio. Voluptates, accusantium quibusdam nihil exercitationem architecto consequatur excepturi, mollitia error odit delectus incidunt. Dolorem, eaque! Veniam sed exercitationem temporibus dolorem voluptates ab voluptatum nihil soluta quisquam, omnis repellendus eveniet? Minus ab neque, rerum totam ullam quod ipsum. Modi unde nostrum, ipsa odit perspiciatis nisi id quasi, officiis necessitatibus cumque ullam! Quos aliquid consequatur reiciendis similique, maxime distinctio consequuntur asperiores doloremque? Amet ex blanditiis tenetur provident, vitae officia odio temporibus ipsa obcaecati magni.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores et quisquam iste labore aut repellendus, nobis nisi, aperiam consequuntur, numquam sit consequatur quam nam tempore unde eius optio. Voluptates, accusantium quibusdam nihil exercitationem architecto consequatur excepturi, mollitia error odit delectus incidunt. Dolorem, eaque! Veniam sed exercitationem temporibus dolorem voluptates ab voluptatum nihil soluta quisquam, omnis repellendus eveniet? Minus ab neque, rerum totam ullam quod ipsum. Modi unde nostrum, ipsa odit perspiciatis nisi id quasi, officiis necessitatibus cumque ullam! Quos aliquid consequatur reiciendis similique, maxime distinctio consequuntur asperiores doloremque? Amet ex blanditiis tenetur provident, vitae officia odio temporibus ipsa obcaecati magni.</p>    
      </div>
      <div class="comments">
          <h3>文章留言</h3>
          <CommentCard username="Dada878" message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse vitae et corrupti ipsum, tenetur, consequatur unde dicta eveniet explicabo architecto quod velit natus fuga dolorem iste placeat eius fugit distinctio, quidem eaque molestiae? Veniam dolor, omnis illo quae tempore repellat!" />
          <CommentCard username="Dada878" message="quidem eaque molestiae? Veniam dolor, omnis illo quae tempore repellat!" />
          <h3>發表留言</h3>
          <div class="new-comment">
              <input placeholder="輸入你的暱稱" type="text">
              <textarea ref="newCommentTextarea" class="new-comment-content" placeholder="輸入留言內容"></textarea>
              <button class="btn">確認送出</button>
          </div>
      </div>
  </div>
</template>
<script lang="ts" setup>
import CommentCard from '@/components/CommentCard.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const message = ref("");
const boxHeight = ref("2rem");
const newCommentTextarea = ref<HTMLTextAreaElement | null>(null);

onMounted(() => {
  if (newCommentTextarea.value) {
      newCommentTextarea.value.style.height = boxHeight.value;
      newCommentTextarea.value.addEventListener('input', () => {
          if (newCommentTextarea.value) {
              newCommentTextarea.value.style.height = 'auto';
              newCommentTextarea.value.style.height = `${newCommentTextarea.value.scrollHeight-32}px`;
          }
      });
  }
});

message.value = router.currentRoute.value.params.id as string;
</script>
<style lang="scss" scoped>
.blog-post {
  text-align: left;
  margin-left: 20%;
  margin-right: 20%;
  background-color: #364049b0;
  color: #e0e2e9cb;
  font-size: 20px;
  .content {
      padding: 3rem;
      padding-top: 5rem;
      padding-bottom: 0rem;
  }
  .comments {
      padding: 3rem;
      padding-top: 0rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .new-comment {
          padding: 1rem;
          background-color: #47525e;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          input, textarea {
              border-radius: 1rem;
              padding: 1rem;
              background-color: #626d79;
              border: none;
              font-size: 1rem;
              vertical-align: middle;
              outline: none;
              color: rgb(255, 255, 255);
          }
          .btn {
              background-color: #626d79;
              color: #e0e2e9cb;
              border: none;
              outline: none;
              border-radius: 1rem;
              padding: 1rem;
              cursor: pointer;
              font-size: 1rem;
              transition: background-color 200ms;
              &:hover {
                  background-color: #707a85;
              }
          }
          .new-comment-content {
              height: v-bind(boxHeight);
          }
      }
      h3 {
          margin-bottom: 0rem;
      }
  }
}
</style>