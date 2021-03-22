<template>
  <div class="d-container">
    <quill-editor
      ref="quillEditor"
      v-model="content"
      :options="quillOption"
      class="editor"
      @blur="onEditorBlur($event)"
      @change="onEditorChange($event)"
      @focus="onEditorFocus($event)"
    >
    </quill-editor>
    <h3 :style="{ marginBottom: '16px' }">
      选择问题列表
    </h3>
    <a-list :data-source="questionList" bordered>
      <a-list-item slot="renderItem" slot-scope="item, index" class="question-item">
        <span class="mr-4">{{ index + 1 }}.</span>
        <p>{{ item }}</p>
        <a-button
          :size="'small'"
          icon="delete"
          shape="circle"
          type="dashed"
          @click="handleDelete(index)"
        ></a-button>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import quillMixin from './quill.mixin'

export default {
  name: 'codes',
  mixins: [quillMixin],
  data() {
    return {
      questionList: [],
      content: '相比小说，散文地位微小。小说曲折的情节，让读者更容易体会到激情，散文则比较困难，特别是那些专注于花鸟虫鱼的闲适散文。\n' +
        '散文真正的好处，在于它能抓住时间，那些放在记忆里会被吹散熄灭的故事、情绪，被文字定格下来，从时间的河流中提取保存，脱离控制，对自己是一种满足和交待。\n' +
        '看散文，和读诗一样，是读语言。今天推荐的这几部散文集，都来自国内著名的文学大师，他们笔下的散文有怎样的语言美，定格了怎样的故事和情绪呢？\n' +
        '1.《王小波散文精选》\n' +
        '作者：王小波\n' +
        '王小波的一生酷爱自由，追求自由的价值和灵魂。\n' +
        '人们都说王小波的文字有毒，他的行文风格有着明显的理工科背景色彩，将搞怪与无厘头进行到底。读王小波的文章总能在大笑中有股阵痛。\n' +
        '他的文字，富于想象力，又不乏理性精神，以喜剧精神和幽默风格述说人类生存的荒谬，并透过故事描写权力对创作欲望和人性需求的扭曲和压制。\n' +
        '本书收入王小波最具代表性的散文，包括《沉默的大多数》、《思维的乐趣》等最脍炙人口的名作。反映了作者在那个特殊年代的故事和难以言说的情绪。\n' +
        '【经典语录】我的勇气和你的勇气加起来对付这世界总够了吧？去向世界发出我们的声音，我一个人是不敢的，有了你，我就敢。\n' +
        '——王小波《爱你就像爱生命》\n' +
        '2.《周国平散文精选》\n' +
        '作者：周国平\n' +
        '男不可不读王小波，女不可不读周国平。而事实上，无论男女老少，都应该读一读周国平。\n' +
        '有人评价说：周国平的散文如白玉兰一样芳香四溢，清爽干净。读他的文章会给人一种从闹市的喧嚣中抽离，仿佛置身于若禅若道的静谧世界的感觉，给人一种难得的清醒。\n' +
        '周国平的散文富含深厚的哲学意境，但又不失人间的烟火气。他擅长通过哲学来写女性、教育、生命，探究生死、自我、灵魂与超越。他对社会与人性的深切关注，对人的精神状态的期望，也照亮了所有读者的精神世界。\n' +
        '本书包含《我们都是孤独的行路人》《只是眷恋这人间烟火》《生命本就纯真》《幸福是一种能力》《每个生命都要结伴而行》《每个人都是一个宇宙》等多篇周国平优秀的文章，读来顿感生命的通透和觉醒。\n' +
        '【经典语录】灵魂足够深刻，才会发现藏在深处的就是孤独。我们都是孤独的行路人。\n' +
        '——周国平《我们都是孤独的行路人》\n' +
        '3.《可喜的寂寞——老舍散文》\n' +
        '作者：老舍\n' +
        '舍的散文篇幅不长，明白如话，清新质朴，大雅若俗。幽默俏皮，充满智慧，耐人寻味，这就是老舍散文最大的特点。\n' +
        '老舍的散文多取材于最世俗最平凡的生活小事，但俗得有味道、俗得有哲理。老舍先生想得深，看得透，说的俏，读他的散文，时时能感受到先生的幽默，先生的人生哲学。\n' +
        '语言艺术大师和幽默大师老舍独特的京味语言和风格，一定会您回味良久。\n' +
        '本书对老舍先生的部分优秀散文作品进行了筛选和整理，并根据其内容与风格特点进行了相应的分类。第一辑以记述老舍早年生活与游历的作品为主；第二辑中多是一些小品与时评；第三辑由一些描写家庭生活的作品构成；第四辑中的作品主要是作者对文学创作的一些看法。随便挑一篇，读起来都会受益良多。\n' +
        '【经典语录】人，即使活到八九十岁，有母亲便可以多少还有点孩子气。失了慈母便像花插在瓶子里，虽然还有色有香，却失去了根。有母亲的人，心里是安定的。\n' +
        '——老舍 《我的母亲》\n' +
        '4.《随遇而安——汪曾祺散文》\n' +
        '作者：汪曾祺\n' +
        '汪曾祺被誉为“抒情的人道主义者，中国最后一个纯粹的文人，中国最后一个士大夫”。\n' +
        '汪曾祺的散文，记人、记事、谈文化、谈风景、谈草木虫鱼、瓜果食物。不追求结构的苦心经营，也不饰辞藻，于平淡无奇中，娓娓道来，如话家常。读汪曾祺的散文，会有一种重温曾经消逝的古典主义名士散文风的魅力。\n' +
        '本书收录了汪曾祺的多篇经典散文。花园、关于葡萄、翠湖心影、泰山片石、赵树理同志二三事、皖南一到、天山行色、遥寄爱荷华、怀念德熙、美国女生、悬空的人、随遇而安、四方食事、故乡的野菜、果蔬秋浓等。\n' +
        '本书是非常适合青少年和广大读者阅读的佳作，不管是写凡人小事还是谈花鸟虫鱼，均于不经心中设传神妙笔。\n' +
        '【经典语录】小时读囊萤映雪故事，觉得东晋的车胤用练囊盛了几十只萤火虫，照了读书，还不如用鸭蛋壳来装萤火虫。不过用萤火虫照亮来读书，而且一夜读到天亮，这能行么?车胤读的是手写的卷子，字大，若是读现在的新五号字，大概是不行的。\n' +
        '——汪曾祺《端午的鸭蛋》\n' +
        '5.《余秋雨散文》\n' +
        '作者：余秋雨\n' +
        '余秋雨，开创文化大散文之先河，集中国当代文史领域之大成。\n' +
        '他的散文探寻中国人的精神主脉，重现中国文化的历史沧桑，探析中国文人人格理想，解读中国文化，追寻人类文明，是值得一读再读的文化与文学经典。\n' +
        '语言典雅、灵动，如诗一般，思想飘逸，像是一位哲化的诗人。透露着对中国历史、中国文化的追溯、思索和反问。\n' +
        '本书由余秋雨先生亲自甄选经典篇目，全新结集出版。收录了余秋雨三十多年创作的代表作，累积了作者二十年走遍世界的文化考察，三十年的学术研究，四十年的持续创作，五十年的古典文化修养，堪称余秋雨三十年来文化思索的完美结晶。\n' +
        '【经典语录】文明可能产生于野蛮，但绝不喜欢野蛮，我们能熬过苦难，却绝不赞美苦难，我们不害怕迫害，却绝不肯定迫害。\n' +
        '——余秋雨《文化苦旅》\n' +
        '\n',
    }
  },
  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },
    handleDelete(index) {
      this.questionList.splice(index, 1)
    }
  },
}
</script>

<style lang="scss">
img[class*='answer-wrap-'] {
  width: 40px;
  height: 20px;
}

.owner-tool-btn {
  font-size: 18px !important;
}

.question-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  p {
    flex: 1;
  }
}

.editor {
  line-height: normal !important;
  height: 40vh;
  margin: 0 0 80px;
}

.ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}

.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: '保存';
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode=video]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体';
}

.ql-align-center {
  text-align: center;
}

.ql-align-right {
  text-align: right;
}

.ql-align-left {
  text-align: left;
}
</style>
