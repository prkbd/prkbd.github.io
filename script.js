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
    //должна называться так же, как имеющийся цикл
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
    loop_test: {
      is_balansing: true,
      change_type: change_types.select,
      1: function(loop) { return loop.seq == 1 },
      2: function(loop) { return loop.seq == 2 },
      3: function(loop) { return loop.seq == 1 }
    },
    loop_test_2: {
      is_balansing: false,
    },
  },
  // конец первой группы
  2: {
  id: 2,
  name: 'вторая группа',
  loop_1: {
    is_balansing: true,
    change_type: change_types.seq,
    1: [1, 5, 2, 8, 4, 3, 7, 9, 6],
    2: [1, 6, 3, 9, 5, 4, 8, 2, 7],
    3: [1, 7, 4, 2, 6, 5, 9, 3, 8],
    4: [1, 8, 5, 3, 7, 6, 2, 4, 9],
    5: [1, 2, 7, 5, 9, 8, 4, 6, 3],
    6: [1, 4, 9, 7, 3, 2, 6, 8, 5],
    7: [1, 9, 6, 4, 8, 7, 3, 5, 2],
    8: [1, 3, 8, 6, 2, 9, 5, 7, 4],
    }, 
  },
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
    let u = new for_loop(name, window.service.group[name]);
    console.log(screen.internals.parsedOptions.templateParameters);
    u.set_loop(screen.internals.parsedOptions.templateParameters);
    
    let new_loop = u.loop,
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
          "content": "\u003Ccenter class=\"small_text_screen\"\u003EНа экране Вам будут предъявляться фрагменты текста (одно предложение). Все слова, кроме одного, будут скрыты под специальной областью (█████), пока Вы не прочитаете это слово.\u003Cbr\u003E\u003Cbr\u003E\nДля того, чтобы перейти к следующему слову, Вам необходимо будет нажать на кнопку со стрелкой «вправо», при этом новое слово станет доступно для чтения, а предыдущее скроется.\u003Cbr\u003E\u003Cbr\u003E Вы можете вернуться к предыдущему слову, если захотите перечитать его, нажав на кнопку со стрелкой «влево».\u003Cbr\u003E\u003Cbr\u003E\nКогда сочтёте, что предложение понятно Вам, нажмите на кнопку «Перейти к вопросам» (можете воспользоваться кнопкой «Enter»).\u003Cbr\u003E\u003Cbr\u003E\n\u003C\u002Fcenter\u003E"
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
      "title": "Instruction_1_short",
      "skip": "${window.service.group.id == 2}",
      "tardy": true
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "\u003Ccenter class=\"text_screen\"\u003EИнструкция\u003C\u002Fcenter\u003E",
          "content": "\u003Ccenter class=\"small_text_screen\"\u003E Пожалуйста, старайтесь читать в привычном для Вас темпе, не читайте вслух и не задерживайтесь, чтобы передохнуть.\u003Cbr\u003E\u003Cbr\u003E\nПосле каждого прочитанного предложения Вам необходимо будет ответить на 4 коротких вопроса, связанных с этим предложением, поэтому Вам важно не просто прочитать предложение, но и понять описанную в нём ситуацию.\u003Cbr\u003E\u003Cbr\u003E \nПеред основной частью Вы сможете потренироваться.\u003Cbr\u003E\u003Cbr\u003E\nЕсли Вам понятна инструкция, нажмите «Дальше», чтобы перейти к тестовой части.\u003Cbr\u003E\u003Cbr\u003E\n\u003C\u002Fcenter\u003E"
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
      "title": "Instruction_2_short",
      "skip": "${window.service.group.id == 2}",
      "tardy": true
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "\u003Ccenter class=\"text_screen\"\u003EИнструкция\u003C\u002Fcenter\u003E",
          "content": "\u003Ccenter class=\"small_text_screen\"\u003EНа экране Вам будут предъявляться фрагменты текста (один абзац). Все слова, кроме одного, будут скрыты под специальной областью (█████), пока Вы не прочитаете это слово.\u003Cbr\u003E\u003Cbr\u003E\nДля того, чтобы перейти к следующему слову, Вам необходимо будет нажать на кнопку со стрелкой «вправо», при этом новое слово станет доступно для чтения, а предыдущее скроется.\u003Cbr\u003E\u003Cbr\u003E Вы можете вернуться к предыдущему слову, если захотите перечитать его, нажав на кнопку со стрелкой «влево».\u003Cbr\u003E\u003Cbr\u003E\nКогда сочтёте, что текст понятен Вам, нажмите на кнопку «Перейти к вопросам» (можете воспользоваться кнопкой «Enter»).\u003Cbr\u003E\u003Cbr\u003E\n\u003C\u002Fcenter\u003E"
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
      "title": "Instruction_1_long",
      "tardy": true,
      "skip": "${window.service.group.id == 1}"
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "\u003Ccenter class=\"text_screen\"\u003EИнструкция\u003C\u002Fcenter\u003E",
          "content": "\u003Ccenter class=\"small_text_screen\"\u003E Пожалуйста, старайтесь читать в привычном для Вас темпе, не читайте вслух и не задерживайтесь, чтобы передохнуть.\u003Cbr\u003E\u003Cbr\u003E\nПосле каждого прочитанного абзаца Вам необходимо будет ответить на 4 коротких вопроса, связанных с этим текстом, поэтому Вам важно не просто прочитать его, но и понять описанную в нём ситуацию.\u003Cbr\u003E\u003Cbr\u003E \nПеред основной частью Вы сможете потренироваться.\u003Cbr\u003E\u003Cbr\u003E\nЕсли Вам понятна инструкция, нажмите «Дальше», чтобы перейти к тестовой части.\u003Cbr\u003E\u003Cbr\u003E\n\u003C\u002Fcenter\u003E"
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
      "title": "Instruction_2_long",
      "tardy": true,
      "skip": "${window.service.group.id == 1}"
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "text": "Глаза женщины всё чаще и чаще как-то вскидывались навстречу вопросам."
        },
        {
          "text": "К вечеру этого же дня он спокойно включился в квадрат своей комнаты и спал без снов."
        },
        {
          "text": "Предутренний ветер качнул тенями деревьев и снова положил их на место, у наших ног."
        },
        {
          "text": "Буквы на страницах присмирели и чёрными скрюченными уродцами глядели со строк."
        },
        {
          "text": "Люди растыкали глаза по витринам, плакатам и не замечали созерцателя."
        },
        {
          "text": "Её длинные кудрявые волосы всё сильнее и сильнее развивались на укушенном ветру."
        },
        {
          "text": "В ночи мелькнули короткие седые зубы моего нового добродушного приятеля."
        },
        {
          "text": "Далеко внизу, в раздутой ртами глубине плескались маленькие беззаботные рыбки."
        },
        {
          "text": "Лицо человека перепрыгнуло стол и было похоже на лицо его давно немолодого отца."
        },
        {
          "text": "Сегодняшнее утро выходило за борт и освежало усталых путников своей ясностью."
        },
        {
          "text": "За слегка приоткрытой дверью была видна спина печально сидящей у окна девушки."
        },
        {
          "text": "Заходя во двор, он торопливо прошагал вдоль клумб с давно увядшими розами."
        },
        {
          "text": "Большим удовольствием было для них видеть эту маленькую девочку в своём доме."
        },
        {
          "text": "Они всё чаще и чаще замечали какую-то странную фигуру на другом берегу реки."
        },
        {
          "text": "Солнечные блики мерцали повсюду и привлекали внимание игривого котёнка."
        },
        {
          "text": "Сановитый, жирный Бык Маллиган возник из лестничного проема, неся в руках чашку с пеной, на которой накрест лежали зеркальце и бритва."
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
console.log(window.service.group)
console.log(window.service.group['loop_1'])
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
    if(document.querySelector('#word') == null) return true;
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
      "title": "Loop_1_short",
      "tardy": true,
      "indexParameter": "text_counter",
      "skip": "${window.service.group.id == 2}",
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
        "tardy": true,
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
                  "content": "\u003Ccenter class=\"mask_text\"\u003E ${ window.text_slider.show(parameters.text)} \u003C\u002Fcenter\u003E\n\u003Cinput type=\"hidden\" name=\"word\" id=\"word\"\u003E\n\u003Cinput type=\"submit\" id=\"hide_submit\"\u003E\n \n\u003Cbutton class=\"to_question\" onclick=\"window.text_slider.end()\"\u003EПерейти к вопросам\u003C\u002Fbutton\u003E\n\n"
                }
              ],
              "scrollTop": true,
              "submitButtonText": "Продолжить →",
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
            "content": "\u003Cform\u003E\n\u003Ccenter\u003E\u003Cbr\u003E\n\u003Cdiv class=\"form\"\u003E\n1. Как Вам кажется, поняли ли Вы это предложение? Постарайтесь, пожалуйста, вкратце рассказать, как Вы поняли описанную ситуацию (что здесь происходит?) и\u002Fили что именно Вам показалось непонятным в ней.\n  \u003Ctextarea name=\"q1\" required\u003E\u003C\u002Ftextarea\u003E\n2. Легко ли читалось это предложение? Выберите число на шкале от -3 до 3, где -3 - очень трудно читалось, 3 - очень легко читалось. \u003Cbr\u003E\n  \u003Cdiv class=\"range_label\"\u003E\n    \u003Cdiv class=\"minus\"\u003E3\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"minus\"\u003E2\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"minus\"\u003E1\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E0\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E1\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E2\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E3\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003Cinput name=\"q2\" type=\"range\" min=\"-3\" max=\"3\"\u003E \n\n3. Попадались ли Вам малопонятные слова или сочетания слов? Если да, запомнились ли они Вам? Напишите их.\n  \u003Ctextarea name=\"q3\" required\u003E\u003C\u002Ftextarea\u003E\n4. Как Вы оцените стиль автора текста – доступный или не очень? Выберите число на шкале от -3 до 3, где -3 - стиль очень тяжёлый для понимания, 3 - стиль весьма понятный. \u003Cbr\u003E\n  \u003Cdiv class=\"range_label\"\u003E\n    \u003Cdiv class=\"minus\"\u003E3\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"minus\"\u003E2\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"minus\"\u003E1\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E0\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E1\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E2\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E3\u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cinput name=\"q4\" type=\"range\" min=\"-3\" max=\"3\"\u003E\u003Cbr\u003E\n\n\n  \u003Cbutton type=\"submit\"\u003EПродолжить\u003C\u002Fbutton\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fcenter\u003E\n\u003C\u002Fform\u003E",
            "scrollTop": true,
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "questions_short",
            "tardy": true
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": "\u003Ccenter class=\"text_screen\"\u003E\u003Cbr\u003E\nТестовая часть закончена. Если у Вас есть вопросы, задайте их экспериментатору!\u003Cbr\u003E\u003Cbr\u003E\nНажмите \"Начать\", когда будете готовы перейти к основной части эксперимента.\n\u003C\u002Fcenter\u003E"
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
            "skip": "${ parameters.text_counter != 0 }"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": "\u003Ccenter class=\"text_screen\"\u003E\u003Cbr\u003E\nВы прошли половину эксперимента! Можете немного отдохнуть.\u003Cbr\u003E\u003Cbr\u003E\nНажмите \"Продолжить\", когда будете готовы перейти ко второй части эксперимента.\n\u003C\u002Fcenter\u003E"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Продолжить →",
            "submitButtonPosition": "right",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "relax",
            "skip": "${ parameters.text_counter != 7 }"
          }
        ]
      }
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "text": "Отступив и показывая на зеркало, Стивен с горечью произнес: \"Вот символ ирландского искусства. Треснувшее зеркало служанки\"."
        },
        {
          "text": "Его всё утро мучали незнакомые люди, заставляя сверкать улыбкой в ответ на их глупые вопросы. Это было ужасно для того, кто привык к одиночеству. К вечеру этого же дня он спокойно включился в маленький уютный квадрат своей комнаты и спал без снов."
        },
        {
          "text": "Наконец удалось усмирить гнев и заковать его в письмо. Он бросил перо и тут же перечитал рукопись. Буквы на страницах присмирели и чёрными скрюченными уродцами глядели со строк. Такими же уродливыми были его истинные чувства к своему брату."
        },
        {
          "text": "Я начал расспрашивать её, заставляя постепенно возвращаться к своему мрачному прошлому. Сначала она молчала, потом стала робко кивать. Глаза женщины все чаще и чаще как-то вскидывались навстречу вопросам. Она была явно заинтригована."
        },
        {
          "text": "Мы говорили всю ночь, сидя на лавочке под высокими липами. Неожиданно для нас начало светать. Предутренний ветер качнул тенями деревьев и снова положил их на место, у наших ног. И тут только я заметил, что моя собеседница дрожит от холода."
        },
        {
          "text": "В комнате творилось настоящее безумие. Билась посуда, звуки хохота прерывались воем и визгом. Оля заглянула внутрь. Лицо человека перепрыгнуло стол и было похоже на лицо его давно немолодого отца. Испугавшись, она совсем выбежала из дома."
        },
        {
          "text": "Девушка взобралась на самую высокую часть холма. К этому времени солнце скрылось и стало так холодно, что щипало щёки, как в мороз. Её длинные кудрявые волосы развивались на укушенном ветру всё сильнее и сильнее, но она не останавливалась."
        },
        {
          "text": "Зайдя в дом, он стянул с себя куртку и радостно направился в гостиную, но в ней никого не было. Все комнаты в доме были запечатаны, кроме одной. За слегка приоткрытой дверью была видна спина печально сидящей у окна девушки. Она даже не обернулась на шум."
        },
        {
          "text": "Прежде они любили выходить в сад и наслаждаться свежестью раннего утра за чашкой чая, но вскоре всё изменилось. Они всё чаще и чаще замечали какую-то странную фигуру на другом берегу реки. Это беспокоило их, и они предпочитали оставаться в доме."
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
console.log(window.service.group)
console.log(window.service.group['loop_1'])
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
    if(document.querySelector('#word') == null) return true;
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
      "title": "Loop_2_long",
      "tardy": true,
      "indexParameter": "text_counter",
      "skip": "${window.service.group.id == 1}",
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
                  "content": "\u003Ccenter class=\"mask_text\"\u003E ${ window.text_slider.show(parameters.text)} \u003C\u002Fcenter\u003E\n\u003Cinput type=\"hidden\" name=\"word\" id=\"word\"\u003E\n\u003Cinput type=\"submit\" id=\"hide_submit\"\u003E\n \n\u003Cbutton class=\"to_question\" onclick=\"window.text_slider.end()\"\u003EПерейти к вопросам\u003C\u002Fbutton\u003E\n\n"
                }
              ],
              "scrollTop": true,
              "submitButtonText": "Продолжить →",
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
            "content": "\u003Cform\u003E\n\u003Ccenter\u003E\u003Cbr\u003E\n\u003Cdiv class=\"form\"\u003E\n1. Как Вам кажется, поняли ли Вы этот текст? Постарайтесь, пожалуйста, вкратце рассказать, как Вы поняли описанную ситуацию (что здесь происходит?) и\u002Fили что именно Вам показалось непонятным в ней.\n  \u003Ctextarea name=\"q1\" required\u003E\u003C\u002Ftextarea\u003E\n2. Легко ли читался этот текст? Выберите число на шкале от -3 до 3, где -3 - очень трудно читался, 3 - очень легко читался. \u003Cbr\u003E\n  \u003Cdiv class=\"range_label\"\u003E\n    \u003Cdiv class=\"minus\"\u003E3\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"minus\"\u003E2\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"minus\"\u003E1\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E0\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E1\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E2\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E3\u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003Cinput name=\"q2\" type=\"range\" min=\"-3\" max=\"3\"\u003E \n\n3. Попадались ли Вам малопонятные слова или сочетания слов? Если да, запомнились ли они Вам? Напишите их.\n  \u003Ctextarea name=\"q3\" required\u003E\u003C\u002Ftextarea\u003E\n4. Как Вы оцените стиль автора текста – доступный или не очень? Выберите число на шкале от -3 до 3, где -3 - стиль очень тяжёлый для понимания, 3 - стиль весьма понятный. \u003Cbr\u003E\n  \u003Cdiv class=\"range_label\"\u003E\n    \u003Cdiv class=\"minus\"\u003E3\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"minus\"\u003E2\u003C\u002Fdiv\u003E\n    \u003Cdiv class=\"minus\"\u003E1\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E0\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E1\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E2\u003C\u002Fdiv\u003E\n    \u003Cdiv\u003E3\u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n  \u003Cinput name=\"q4\" type=\"range\" min=\"-3\" max=\"3\"\u003E\u003Cbr\u003E\n\n\n  \u003Cbutton type=\"submit\"\u003EПродолжить\u003C\u002Fbutton\u003E\n\u003C\u002Fdiv\u003E\n\u003C\u002Fcenter\u003E\n\u003C\u002Fform\u003E",
            "scrollTop": true,
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "questions_long",
            "tardy": true
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": "\u003Ccenter class=\"text_screen\"\u003E\u003Cbr\u003E\nТестовая часть закончена. Если у Вас есть вопросы, задайте их экспериментатору!\u003Cbr\u003E\u003Cbr\u003E\nНажмите \"Начать\", когда будете готовы перейти к основной части эксперимента.\n\u003C\u002Fcenter\u003E"
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
            "skip": "${ parameters.text_counter != 0 }"
          },
          {
            "type": "lab.html.Page",
            "items": [
              {
                "type": "text",
                "content": "\u003Ccenter class=\"text_screen\"\u003E\u003Cbr\u003E\nВы прошли половину эксперимента! Можете немного отдохнуть.\u003Cbr\u003E\u003Cbr\u003E\nНажмите \"Продолжить\", когда будете готовы перейти ко второй части эксперимента.\n\u003C\u002Fcenter\u003E"
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Продолжить →",
            "submitButtonPosition": "right",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "relax",
            "skip": "${ parameters.text_counter != 4 }"
          }
        ]
      }
    },
    {
      "type": "lab.html.Form",
      "content": "\u003Cform\u003E\n\u003Ccenter\u003E\n  \u003Cdiv class=\"form\"\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\nУкажите, пожалуйста, насколько вдумчиво Вы отвечали на вопросы в ходе эксперимента.\u003Cbr\u003E\n  \u003Cselect name=\"user_feedback\"\u003E\n    \u003Coption value=\"1\"\u003EНе сказал(а) бы, что отвечал(а) вдумчиво\u003C\u002Foption\u003E\n    \u003Coption value=\"2\"\u003EОтвечал(а) скорее вдумчиво\u003C\u002Foption\u003E\n    \u003Coption value=\"3\"\u003EСтарался\u002Fстаралась отвечать как можно более вдумчиво\u003C\u002Foption\u003E\n  \u003C\u002Fselect\u003E\u003Cbr\u003E\u003Cbr\u003E\n  Ваши комментарии о прохождении\u003Cbr\u003E\n    \u003Ctextarea name=\"comment\" required\u003E\u003C\u002Ftextarea\u003E\u003Cbr\u003E\u003Cbr\u003E\n  \u003Cbutton type=\"submit\"\u003EЗакончить\u003C\u002Fbutton\u003E \n  \u003C\u002Fdiv\u003E\n\u003C\u002Fcenter\u003E\n\u003C\u002Fform\u003E",
      "scrollTop": true,
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "User_feedback"
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