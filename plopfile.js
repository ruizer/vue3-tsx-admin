const VueTemplate = 'plop-templates/vue/vue.hbs'
const VueTemplateLess = 'plop-templates/vue/vue.less.hbs'
const VueTemplateTs = 'plop-templates/vue/vue.ts.hbs'

const TsxTemplate = 'plop-templates/tsx/tsx.hbs'
const TsxTemplateLess = 'plop-templates/tsx/tsx.less.hbs'

const actionsJsx = (type = '2') => {
  let actions = []

  if (type === '1') {
    actions = [
      {
        type: 'add',
        path: '{{path}}/{{kebabCase name}}.tsx',
        templateFile: TsxTemplate,
      },
    ]
  } else {
    actions = [
      {
        type: 'add',
        path: '{{path}}/{{kebabCase name}}/index.tsx',
        templateFile: TsxTemplate,
      },
      {
        type: 'add',
        path: '{{path}}/{{kebabCase name}}/index.module.less',
        templateFile: TsxTemplateLess,
      },
    ]
  }
  return actions
}

const actionsVue = (type = '2') => {
  let actions = []

  if (type === '1') {
    actions = [
      {
        type: 'add',
        path: '{{path}}/{{kebabCase name}}.vue',
        templateFile: VueTemplate,
      },
    ]
  } else {
    actions = [
      {
        type: 'add',
        path: '{{path}}/{{kebabCase name}}/index.vue',
        templateFile: VueTemplate,
      },
      {
        type: 'add',
        path: '{{path}}/{{kebabCase name}}/index.less',
        templateFile: VueTemplateLess,
      },
      {
        type: 'add',
        path: '{{path}}/{{kebabCase name}}/index.ts',
        templateFile: VueTemplateTs,
      },
    ]
  }
  return actions
}

module.exports = (plop) => {
  plop.addHelper('compare', function (a, b, options) {
    if (a == b) {
      //满足添加继续执行
      return options.fn(this) // 固定写法
    } else {
      //不满足条件执行{{else}}部分
      return options.inverse(this)
    }
  })

  plop.setGenerator('c', {
    description: 'component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is name?',
        default: 'hello',
      },
      {
        type: 'input',
        name: 'path',
        message: 'What is path?',
        default: 'src/views',
      },
      {
        type: 'list',
        name: 'mode',
        message: 'What is mode?',
        default: 'tsx',
        choices: [
          { name: 'tsx', value: 'tsx' },
          { name: 'vue', value: 'vue' },
        ],
      },
      {
        type: 'list',
        name: 'type',
        message: 'What is type?',
        default: '2',
        choices: [
          { name: '创建单个文件', value: '1' },
          { name: '文件夹模式', value: '2' },
        ],
      },
    ],
    actions: (data) => {
      const { type, mode } = data
      return mode === 'vue' ? actionsVue(type) : actionsJsx(type)
    },
  })
}
