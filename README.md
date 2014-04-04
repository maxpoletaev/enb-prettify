enb-prettify
============

Форматтер синтаксиса для [ENB][enb] на основе [js-beautify][js-beautify]. Нужен для приведения файлов в читабельный вид. Содержит технологии:

* `enb-prettify/techs/html-from-bemjson-prettify`


Установка
---------

```bash
npm install --save-dev enb-prettify
```


Описание технологий
-------------------

### html-from-bemjson-prettify

Собирает читабельный *html*-файл с помощью *bemjson* и *bemhtml*.

**Опции**

* `{String} bemhtmlTarget` — Исходный BEMHTML-файл. По умолчанию — `?.bemhtml.js`.
* `{String} bemjsonTarget` — Исходный BEMJSON-файл. По умолчанию — `?.bemjson.js`.
* `{String} destTarget` — Результирующий HTML-файл. По умолчанию — `?.html`.
* `{Object} prettify` — Параметры для [js-beautify][js-beautify-opts]. По умолчанию — `{}`.

**Пример**

```javascript
nodeConfig.addTech([
    require('enb/techs/html-from-bemjson'), {
        prettify: {
            indent_size: 2
        }
    }
]);
```

[enb]: https://github.com/enb-make/enb
[js-beautify]: https://github.com/einars/js-beautify
[js-beautify-opts]: https://github.com/einars/js-beautify#options
