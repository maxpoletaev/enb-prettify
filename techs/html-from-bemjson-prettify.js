/**
* html-from-bemjson-prettify
* ==========================
*
* Собирает читабельный *html*-файл с помощью *bemjson* и *bemhtml*.
*
* **Опции**
*
* * *String* **bemhtmlTarget** — Исходный BEMHTML-файл. По умолчанию — `?.bemhtml.js`.
* * *String* **bemjsonTarget** — Исходный BEMJSON-файл. По умолчанию — `?.bemjson.js`.
* * *String* **destTarget** — Результирующий HTML-файл. По умолчанию — `?.html`.
* * *Object* **prettify** — Параметры для js-beautify. По умолчанию — `{}`.
*
* **Пример**
*
* ```javascript
* nodeConfig.addTech([
*     require('enb/techs/html-from-bemjson'), {
*         prettify: {
*             indent_size: 2
*         }
*     }
* ]);
* ```
*/

var beautify = require('js-beautify').html;
var requireOrEval = require('enb/lib/fs/require-or-eval');
var asyncRequire = require('enb/lib/fs/async-require');
var dropRequireCache = require('enb/lib/fs/drop-require-cache');

module.exports = require('enb/lib/build-flow').create()
    .name('html-from-bemjson-prettify')
    .target('destTarget', '?.html')
    .defineOption('prettify', {})
    .useSourceFilename('bemhtmlTarget', '?.bemhtml.js')
    .useSourceFilename('bemjsonTarget', '?.bemjson.js')
    .builder(function (bemhtmlFilename, bemjsonFilename) {
        var prettify = this._prettify;
        dropRequireCache(require, bemjsonFilename);
        return requireOrEval(bemjsonFilename).then(function (json) {
            dropRequireCache(require, bemhtmlFilename);
            return asyncRequire(bemhtmlFilename).then(function (bemhtml) {
                if (!bemhtml.BEMHTML && bemhtml.lib) {
                    return beautify(bemhtml.apply(json), prettify);
                } else {
                    return beautify(bemhtml.BEMHTML.apply(json), prettify);
                }
            });
        });
    })
    .createTech();
