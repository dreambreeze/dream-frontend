import _ from 'lodash'
import { quillEditor } from "vue-quill-editor";


export default {
  components: { quillEditor },
  data() {
    // toolbar工具栏的工具选项（默认展示全部）
    const toolOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      [{ clean: '源码编辑' }],
      ['link', 'image', 'video'],
      ['addQuestion', 'insertInput'], //新添加的工具
    ]
    return {
      quillOption: {
        placeholder: '',
        theme: 'snow', // 主题
        modules: {
          toolbar: {
            container: toolOptions, // 工具栏选项
            handlers: {
              shadeBox: null,
              addQuestion: this.addQuestion,
              insertInput: this.insertInput,
            },
          },
        },
        initButton() {
          const addQuestionButton = document.querySelector('.ql-addQuestion')
          addQuestionButton.classList.add('iconjiahao')
          addQuestionButton.classList.add('iconfont')
          addQuestionButton.classList.add('owner-tool-btn')
          addQuestionButton.title = '添加问题'

          const insertInputButton = document.querySelector('.ql-insertInput')
          insertInputButton.classList.add('iconeditor')
          insertInputButton.classList.add('iconfont')
          insertInputButton.classList.add('owner-tool-btn')
          insertInputButton.title = '插入输入框'
        },
        register(q) {
          class input extends q.import('blots/block/embed') {
          }

          class div extends q.import('blots/block/embed') {
          }

          input.blotName = input.tagName = 'input'
          div.blotName = div.tagName = 'div'
          q.register(input)
          q.register(div)
        },
      },
      imgUrl: require('../../assets/images/input.png')
    }
  },
  computed: {
    editor() {
      return this.$refs.quillEditor.quill
    }
  },
  mounted() {
    this.quillOption.initButton()
  },
  methods: {
    selectText() {
      let selecter;
      try {
        selecter = window.getSelection().toString();
        if (selecter != null && selecter.trim() != "") {
          return selecter
        }
      } catch (err) {
        selecter = document.selection.createRange();
        const s = selecter.text;
        if (s != null && s.trim() != "") {
          return s
        }
      }
    },
    addQuestion() {
      const selectText = this.selectText()
      if ( !this.questionList.includes(selectText)) this.questionList.push(selectText)
    },
    insertInput() {
      let selection = window.getSelection()
      let range = selection.getRangeAt(0)
      // let node = document.createElement('div')
      // node.setAttribute('contentEditable', true)
      // node.setAttribute('class', `answer-wrap-${ _.uniqueId() }`)
      let node = document.createElement('img')
      node.setAttribute('src', this.imgUrl)
      node.setAttribute('class', `answer-wrap-${ _.uniqueId() }`)
      // let node = document.createTextNode(`<input value="" placeholder="请输入答案" class="answer-wrap-${ _.uniqueId() }"/>`)
      range.setStart(range.endContainer, range.endOffset)
      range.insertNode(node)
      range.setEnd(range.endContainer, range.endOffset)
      selection.collapse(range.endContainer, range.endOffset)
    },
  },
}
