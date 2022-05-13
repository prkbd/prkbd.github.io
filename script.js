// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.Download",
      "filePrefix": "pilotazh",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "Пилотаж ",
    "description": "",
    "repository": "",
    "contributors": ""
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
window.change_types = {
  'seq': 'change_loop_seq', //сменить секвенцию на заданную
  'select': 'change_loop_select', //показывать только элементы по фильтру
}
window.data_groups = {
  // начало первой группы
  1: {
    id: 1,
    name: 'первая группа',
    loop_1: {
      is_balansing: true,
      change_type: change_types.seq,
      1: [16, 9,	13,	2,	12,	3,	1,	6,	11,	5,	4,	14,	15,	10,	7,	8],
      2: [16, 12,	1,	5,	15,	6,	4,	9,	14,	8,	7,	2,	3,	13,	10,	11],
      3: [16, 14,	3,	7,	2,	8,	6,	11,	1,	10,	9,	4,	5,	15,	12,	13],
      4: [16, 8,	12,	1,	11,	2,	15,	5,	10,	4,	3,	13,	14,	9,	6,	7],
      5: [16, 3,	7,	11,	6,	12,	10,	15,	5,	14,	13,	8,	9,	4,	1,	2],
      6: [16, 6,	10,	14,	9,	15,	13,	3,	8,	2,	1,	11,	12,	7,	4,	5],
      7: [16, 2,	6,	10,	5,	11,	9,	14,	4,	13,	12,	7,	8,	3,	15,	1],
      8: [16, 5,	9,	13,	8,	14,	12,	2,	7,	1,	15,	10,	11,	6,	3,	4],
      9: [16, 7,	11,	15,	10,	1,	14,	4,	9,	3,	2,	12,	13,	8,	5,	6],
      10: [16, 10,	14,	3,	13,	4,	2,	7,	12,	6,	5,	15,	1,	11,	8,	9],
      11: [16, 4,	8,	12,	7,	13,	11,	1,	6,	15,	14,	9,	10,	5,	2,	3],
      12: [16, 13,	2,	6,	1,	7,	5,	10,	15,	9,	8,	3,	4,	14,	11,	12],
      13: [16, 15,	4,	8,	3,	9,	7,	12,	2,	11,	10,	5,	6,	1,	13,	14],
      14: [16, 11,	15,	4,	14,	5,	3,	8,	13,	7,	6,	1,	2,	12,	9,	10],
      15: [16, 1,	5,	9,	4,	10,	8,	13,	3,	12,	11,	6,	7,	2,	14,	15]
    },
    //должна называться так же, как имеющийся цикл
    loop_2: {
      is_balansing: true,
      change_type: change_types.select,
      1: function(loop) { return loop.seq == 1 },
      2: function(loop) { return loop.seq == 2 },
      3: function(loop) { return loop.seq == 1 }
    },
    loop_3: {
      is_balansing: false,
    },
  },
  // конец первой группы
}

//window.

class for_loop {
  constructor(name, loop_obj) {
    this._name = name;  
    this._seq = Object.assign({}, loop_obj);
  }

  set_loop(value) {
   this._loop =  Object.assign({}, value);
  }
  get loop() {
    let loop_param = window.service.parameter_by_name(this._name);
    loop_param = loop_param == null ? 1 : parseInt(loop_param);
   
    if(!this._seq.is_balansing) return null;

    let new_loop = [];

    if(this._seq.change_type == change_types.seq)
      for(let i in this._seq[loop_param]) 
        for(let j in this._loop) 
          if(j == this._seq[loop_param][i] - 1) 
            new_loop.push(Object.assign({}, this._loop[j]))
            
    if(this._seq.change_type == change_types.select)
      for(let j in this._loop)  {
        console.log(j)
        console.log(this._seq[loop_param](this._loop[j]))
        if(this._seq[loop_param] != undefined && this._seq[loop_param](this._loop[j]) )
          new_loop.push(Object.assign({}, this._loop[j]))
      }
    return new_loop
  }
}

window.service = {
  data_groups: window.data_groups,
  _group: -1,

  //получение группы
  //название функции - название параметра
  get group() {
    if(this._group != -1) 
      return this._group;

    //получить название функции
    let func_name = this.function_name( arguments.callee.toString() );
    //получить из ссылки по названию функции такое
    group_param = this.parameter_by_name(func_name);
    this.group = group_param == null ? 1 : group_param;

    return this._group;
  },
  //сменить группу
  set group(value) {
    this._group = Object.assign({}, this.data_groups[value]);
  },
  function_name: function(func_name) {
    return func_name.split('(')[0].split(' ')[1];
  },
  parameter_by_name: function(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },
  extend_loop: function(name, screen, n) {
    let start = screen.internals.parsedOptions.templateParameters.length - 1;
    for(let i = start; i < n; i++)
      screen.internals.parsedOptions.templateParameters.push(screen.internals.parsedOptions.templateParameters[start])
  },
  change_loop: function(name, screen) {
    service.group[name] = new for_loop(name, window.service.group[name]);

    service.group[name].set_loop(screen.internals.parsedOptions.templateParameters);
    
    let new_loop = window.service.group[name].loop,
        delete_list = [];
        
    if(new_loop == null) return false;

    for(let i in screen.internals.parsedOptions.templateParameters) 
      if(new_loop.length > i)
        screen.internals.parsedOptions.templateParameters[i] = new_loop[i];
      else
        delete_list.push(i);
        
    //удаляет элементы, если это нужно
    for(let i = delete_list.length -1; i >= 0; i--)
      screen.internals.parsedOptions.templateParameters.splice(delete_list[i], 1);
  },
  keys_for_bind: {
    //'key_1': ['37', function(){}]
  },
  check_key: function(e) {
    e = e || window.event;

    let is_keypress = false;
    
    for(let i in window.service.keys_for_bind)
      if (e.keyCode == (window.service.keys_for_bind[i][0] + ""))  {
        window.service.keys_for_bind[i][1]();
        is_keypress = true;
      }

    if(!is_keypress) return true;

    if(document.querySelector('#hide_submit') != null)
      document.querySelector('#hide_submit').click();
  },
  bind_keys: function(keys) {
    this.keys_for_bind = {}
    for(let i in keys) {
      this.keys_for_bind[i] = keys[i]
    }
    document.onkeydown = window.service.check_key;
    return true;
  }
};


window.service.group;
}
      },
      "title": "service",
      "skip": true,
      "tardy": true
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "\u003Ccenter class=\"text_screen\"\u003EЗдравствуйте!\u003C\u002Fcenter\u003E",
          "content": "\u003Ccenter class=\"text_screen\"\u003EСпасибо, что согласились поучаствовать \nв нашем эксперименте.\n\u003C\u002Fcenter\u003E"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Дальше →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "Welcome"
    },
    {
      "type": "lab.html.Form",
      "content": "\u003Cform\u003E\n\u003Ccenter\u003E\n  \u003Cdiv class=\"form\"\u003E\n    Адрес электронной почты \u003Cbr\u003E\n    \u003Cinput name=\"participent\" type=\"email\" required\u003E\u003Cbr\u003E\n    Пол \u003Cbr\u003E\n    \u003Cselect name=\"sex\" required\u003E\n      \u003Coption value=\"m\"\u003EМужской\u003C\u002Foption\u003E\n      \u003Coption value=\"f\"\u003EЖенский\u003C\u002Foption\u003E\n    \u003C\u002Fselect\u003E\u003Cbr\u003E\n    Возраст \u003Cbr\u003E\n    \u003Cinput name=\"age\" type=\"number\" required\u003E\u003Cbr\u003E\n    Уровень образования \u003Cbr\u003E\n    \u003Cselect name=\"education\" required\u003E\n      \u003Coption value=\"1\"\u003EСредне-специальное\u003C\u002Foption\u003E\n      \u003Coption value=\"2\"\u003EНеоконченное высшее\u003C\u002Foption\u003E\n      \u003Coption value=\"3\"\u003EБакалавриат\u003C\u002Foption\u003E\n      \u003Coption value=\"4\"\u003EСпециалитет\u003C\u002Foption\u003E\n      \u003Coption value=\"5\"\u003EМагистратура\u003C\u002Foption\u003E\n    \u003C\u002Fselect\u003E\u003Cbr\u003E\n    Направление \u003Cbr\u003E\n    \u003Cinput name=\"direction\" type=\"text\" required\u003E\u003Cbr\u003E\n  Предпочитаемые литературные жанры\u002Fавторы\u003Cbr\u003E\n  \u003Ctextarea name=\"preference\" required\u003E\u003C\u002Ftextarea\u003E\u003Cbr\u003E\n\n    \u003Cbutton type=\"submit\"\u003EНачать\u003C\u002Fbutton\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fcenter\u003E\n\u003C\u002Fform\u003E\n",
      "scrollTop": true,
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "Biography"
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "\u003Ccenter class=\"text_screen\"\u003EИнструкция\u003C\u002Fcenter\u003E",
          "content": "\u003Ccenter class=\"small_text_screen\"\u003EНа экране Вам будут предъявляться фрагменты текста (одно предложение). Все слова, кроме одного, будут скрыты под специальной областью (█████), пока Вы не прочитаете это слово.\u003Cbr\u003E\u003Cbr\u003E\nДля того, чтобы перейти к следующему слову, Вам необходимо будет нажать на кнопку со стрелкой «вправо», при этом новое слово станет доступно для чтения, а предыдущее скроется.\u003Cbr\u003E\u003Cbr\u003E Вы можете вернуться к предыдущему слову, если захотите перечитать его, нажав на кнопку со стрелкой «влево».\u003Cbr\u003E\u003Cbr\u003E\nКогда сочтёте, что предложение понятно Вам, нажмите на кнопку «Enter».\u003Cbr\u003E\u003Cbr\u003E\n\u003C\u002Fcenter\u003E"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Перейти к продолжению инструкции →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "Instruction_1"
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "\u003Ccenter class=\"text_screen\"\u003EИнструкция\u003C\u002Fcenter\u003E",
          "content": "\u003Ccenter class=\"small_text_screen\"\u003E Пожалуйста, старайтесь читать в привычном для Вас темпе и не задерживайтесь, чтобы передохнуть.\u003Cbr\u003E\u003Cbr\u003E\nПосле каждого прочитанного предложения Вам необходимо будет ответить на 4 коротких вопроса, связанных с этим предложением.\u003Cbr\u003E\u003Cbr\u003E \nПеред основной частью Вы сможете потренироваться.\u003Cbr\u003E\u003Cbr\u003E\nЕсли Вам понятна инструкция, нажмите «Дальше», чтобы перейти к тестовой части.\u003Cbr\u003E\u003Cbr\u003E\n\u003C\u002Fcenter\u003E"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Дальше →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "Instruction_2"
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "text": "Глаза женщины всё чаще и чаще как-то вскидывались навстречу вопросам.",
          "is_test": ""
        },
        {
          "text": "К вечеру этого же дня он спокойно включился в квадрат своей комнаты и спал без снов.",
          "is_test": ""
        },
        {
          "text": "Предутренний ветер качнул тенями деревьев и снова положил их на место, у наших ног.",
          "is_test": ""
        },
        {
          "text": "Буквы на страницах присмирели и чёрными скрюченными уродцами глядели со строк.",
          "is_test": ""
        },
        {
          "text": "Люди растыкали глаза по витринам, плакатам и не замечали созерцателя.",
          "is_test": ""
        },
        {
          "text": "Её длинные кудрявые волосы всё сильнее и сильнее развивались на укушенном ветру.",
          "is_test": ""
        },
        {
          "text": "В ночи мелькнули короткие седые зубы моего нового добродушного приятеля.",
          "is_test": ""
        },
        {
          "text": "Далеко внизу, в раздутой ртами глубине плескались маленькие беззаботные рыбки.",
          "is_test": ""
        },
        {
          "text": "Лицо человека перепрыгнуло стол и было похоже на лицо его давно немолодого отца.",
          "is_test": ""
        },
        {
          "text": "Сегодняшнее утро выходило за борт и освежало усталых путников своей ясностью.",
          "is_test": ""
        },
        {
          "text": "За слегка приоткрытой дверью была видна спина печально сидящей у окна девушки.",
          "is_test": ""
        },
        {
          "text": "Заходя во двор, он торопливо прошагал вдоль клумб с давно увядшими розами.",
          "is_test": ""
        },
        {
          "text": "Большим удовольствием было для них видеть эту маленькую девочку в своём доме.",
          "is_test": ""
        },
        {
          "text": "Они всё чаще и чаще замечали какую-то странную фигуру на другом берегу реки.",
          "is_test": ""
        },
        {
          "text": "Солнечные блики мерцали повсюду и привлекали внимание игривого котёнка.",
          "is_test": ""
        },
        {
          "text": "Сановитый, жирный Бык Маллиган возник из лестничного проёма, неся в руках чашку с пеной, на которой накрест лежали зеркальце и бритва.",
          "is_test": "test"
        }
      ],
      "sample": {
        "mode": "sequential"
      },
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
//сменить цикл
service.change_loop('loop_1', this);
window.text_slider = {
  current_index: 0,
  is_end: false,
  text: '',
  last: function() {
    if(document.querySelector('#word') == null) return true;
    document.querySelector('#word').value = this.text[this.current_index];
    if(this.current_index - 1 >= 0)
      this.current_index--
  },
  next: function() {
    if(document.querySelector('#word') == null) return true;
    document.querySelector('#word').value = this.text[this.current_index];
    if(this.current_index < this.text.length -1)
      this.current_index++
  },
  show: function(text) {
    
    let result = '';
    text = text.split(' ');
    this.text = text;

    for(let i = 0; i < text.length; i++) {
      result+= i == this.current_index ? text[i] : ("<span>" + text[i] + "</span>");
      result+= " ";
    }
    return result;
  },
  end: function() {
    this.is_end = true;
    this.current_index = 0;
  }
}

service.bind_keys([
                   [37, function(){ window.text_slider.last() }],
                   [39, function(){ window.text_slider.next() }],
                   [13, function(){ window.text_slider.end() }]
                  ])


}
      },
      "title": "Loop_1 (custom seq)",
      "tardy": true,
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {
          "": ""
        },
        "parameters": {},
        "messageHandlers": {},
        "title": "Sequence",
        "content": [
          {
            "type": "lab.canvas.Screen",
            "content": [
              {
                "type": "i-text",
                "left": 0,
                "top": 0,
                "angle": 0,
                "width": 18.69,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "+",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              }
            ],
            "viewport": [
              800,
              600
            ],
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "fixation_cross",
            "timeout": "500"
          },
          {
            "type": "lab.canvas.Screen",
            "content": [],
            "viewport": [
              800,
              600
            ],
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "empty",
            "timeout": "400"
          },
          {
            "type": "lab.flow.Loop",
            "templateParameters": [
              {
                "id": "1"
              }
            ],
            "sample": {
              "mode": "draw-shuffle"
            },
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "before:prepare": function anonymous(
) {
//
service.extend_loop('mask_off_loop', this, 400);

},
              "after:end": function anonymous(
) {
window.text_slider.is_end = false
}
            },
            "title": "mask_off_loop (loop extand)",
            "tardy": true,
            "shuffleGroups": [],
            "template": {
              "type": "lab.html.Page",
              "items": [
                {
                  "type": "text",
                  "content": "\u003Ccenter class=\"mask_text\"\u003E ${ window.text_slider.show(parameters.text)} \u003C\u002Fcenter\u003E\n\u003Cinput type=\"hidden\" name=\"word\" id=\"word\"\u003E\n\u003Cinput type=\"submit\" id=\"hide_submit\"\u003E"
                }
              ],
              "scrollTop": true,
              "submitButtonText": "Continue →",
              "submitButtonPosition": "hidden",
              "files": {},
              "responses": {
                "keypress(Enter)": "Enter"
              },
              "parameters": {},
              "messageHandlers": {},
              "title": "mask",
              "tardy": true,
              "skip": "${ window.text_slider.is_end }"
            }
          },
          {
            "type": "lab.html.Form",
            "content": "\u003Cform\u003E\n\u003Ccenter\u003E\u003Cbr\u003E\n\u003Cdiv class=\"form\"\u003E\n1. Как Вам кажется, поняли ли Вы это предложение? Постарайтесь, пожалуйста, вкратце рассказать, как Вы поняли описанную ситуацию и\u002Fили что именно Вам показалось непонятным.\n  \u003Ctextarea name=\"q1\" required\u003E\u003C\u002Ftextarea\u003E\n2. Легко ли читалось это предложение?\n  \u003Ctextarea name=\"q2\" required\u003E\u003C\u002Ftextarea\u003E\n3. Попадались ли Вам малопонятные слова или сочетания слов? Если да, запомнились ли они Вам?\n  \u003Ctextarea name=\"q3\" required\u003E\u003C\u002Ftextarea\u003E\n4. Как Вы оцените стиль автора текста – доступный или не очень?\n  \u003Ctextarea name=\"q4\" required\u003E\u003C\u002Ftextarea\u003E\n\n  \u003Cbutton type=\"submit\"\u003EПродолжить\u003C\u002Fbutton\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fcenter\u003E\n\u003C\u002Fform\u003E",
            "scrollTop": true,
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "questions",
            "tardy": true
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": "\u003Ccenter class=\"text_screen\"\u003E\u003Cbr\u003E\nТестовая часть закончена.\u003Cbr\u003E\u003Cbr\u003E\nНажмите \"Начать\", когда будете готовы перейти к основной части эксперимента.\n\u003C\u002Fcenter\u003E"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Начать →",
            "submitButtonPosition": "right",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "test_end",
            "skip": "${ parameters.is_test != 'test' }"
          }
        ]
      }
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "\u003Ccenter class=\"text_screen\"\u003EЭксперимент пройден!\u003C\u002Fcenter\u003E",
          "content": "\u003Ccenter class=\"text_screen\"\u003EСпасибо за участие!\u003C\u002Fcenter\u003E"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "Continue →",
      "submitButtonPosition": "hidden",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "End",
      "timeout": "500"
    }
  ]
})

// Let's go!
study.run()