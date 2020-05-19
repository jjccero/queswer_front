<template>
  <div>
    <el-form
      :model="questionForm"
      :rules="questionRules"
      class="questionForm"
      label-width="100px"
      label-position="left"
      ref="questionForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="questionForm.title"></el-input>
      </el-form-item>
      <el-form-item label="问题描述" prop="detail">
        <el-input type="textarea" v-model="questionForm.detail"></el-input>
      </el-form-item>
      <el-form-item label="匿名提问" prop="anonymous">
        <el-switch v-model="questionForm.anonymous"></el-switch>
      </el-form-item>
      <el-form-item label="话题" prop="topics">
        <el-tag
          :key="topic"
          v-for="topic in questionForm.topics"
          closable
          @close="handleDeleteTopic(topic)"
          style="margin-right:10px;"
        >{{topic}}</el-tag>
        <el-input
          v-if="inputVisible"
          v-model="topic"
          size="small"
          ref="topic"
          class="topic_input"
          @keyup.enter.native="handleSaveTopic"
          @blur="handleSaveTopic"
        ></el-input>
        <el-button v-else-if="questionForm.topics.length < 5" size="small" @click="showInput">+ 话题</el-button>
      </el-form-item>
      <el-button v-if="hasQuestion" type="primary" @click="handleUpdateQuestion">修改问题</el-button>
      <el-button v-else type="primary" @click="handleSaveQuestion">提问</el-button>
    </el-form>
  </div>
</template>
<script>
import { saveQuestion, updateQuestion } from "@/api/question";
export default {
  name: "SaveQuestion",
  data() {
    return {
      topic: "",
      inputVisible: false,
      questionForm: {
        title: "",
        detail: "",
        anonymous: false,
        topics: []
      },
      questionRules: {
        title: [
          {
            required: true,
            message: "问题标题不能为空"
          }
        ]
      }
    };
  },
  created() {
    if (this.hasQuestion) {
      const question = this.question;
      const questionForm = this.questionForm;
      questionForm.title = question.title;
      questionForm.detail = question.detail;
      questionForm.topics = [...question.topics];
    }
  },
  methods: {
    handleSaveQuestion() {
      this.$refs.questionForm.validate(vaild => {
        if (vaild) {
          const data = JSON.parse(JSON.stringify(this.questionForm));
          saveQuestion(data).then(res => {
            if (res > 0) {
              this.$router.push({
                path: "/question",
                query: {
                  questionId: res
                }
              });
            }
          });
        }
      });
    },
    handleUpdateQuestion() {
      this.$refs.questionForm.validate(vaild => {
        if (vaild) {
          const data = JSON.parse(JSON.stringify(this.questionForm));
          data["questionId"] = this.question.questionId;
          updateQuestion(data).then(res => {
            if (res === true) {
              this.$emit("updateQuestion", data);
            }
          });
        }
      });
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.topic.$refs.input.focus();
      });
    },
    handleSaveTopic() {
      const topic = this.topic.trim();
      if (topic != "") this.questionForm.topics.push(topic);
      this.topic = "";
      this.inputVisible = false;
    },
    handleDeleteTopic(topic) {
      const topics = this.questionForm.topics;
      topics.splice(topics.indexOf(topic), 1);
    }
  },
  computed: {
    hasQuestion() {
      return this.question != null;
    }
  },
  props: ["question"]
};
</script>
<style scoped>
.questionForm {
  text-align: center;
}
.topic_input {
  width: 70px;
}
</style>