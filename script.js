const htmljsRadio = document.querySelector("#htmljsmode"),
      cssRadio = document.querySelector("#cssmode"),
      inputArea = document.querySelector("#input"),
      outputArea = document.querySelector("#output"),
      format = document.querySelector("#format"),
      compress = document.querySelector("#compress"),
      encrypt = document.querySelector("#encrypt");

listenHtmlJsCss();

htmljsRadio.addEventListener('change', listenHtmlJsCss, false);
cssRadio.addEventListener('change', listenHtmlJsCss, false);

function listenHtmlJsCss() {
    if (htmljsRadio.checked) {
        format.addEventListener('click', htmlJsFormat, false);
        compress.addEventListener('click', htmlJsCompress, false);
        encrypt.disabled = false;
        encrypt.addEventListener('click', htmlJsEncrypte, false);
        format.removeEventListener('click', cssFormat, false);
        compress.removeEventListener('click', cssCompress, false);
    } else {
        format.removeEventListener('click', htmlJsFormat, false);
        compress.removeEventListener('click', htmlJsCompress, false);
        encrypt.disabled = true;
        encrypt.removeEventListener('click', htmlJsEncrypte, false);
        format.addEventListener('click', cssFormat, false);
        compress.addEventListener('click', cssCompress, false);
    }
}

function htmlJsFormat() {
    let input = inputArea.value;
    let js_source = input.replace(/^\s+/, '');
    let regEmptyTag = /(<([^\/][^>|^\/>].*)>)(\s*)?(<\/([^>]*)>)/g;
    let tabsize = 4, tabchar = " ";
    let c = "";
    if (js_source && js_source.charAt(0) === '<') {
        c = style_html(js_source, tabsize, tabchar, 80);
    } else {
        c = js_beautify(js_source, tabsize, tabchar);
    }
    outputArea.value = c.replace(regEmptyTag, '$1$4');
};

function htmlJsCompress() {
    let input = inputArea.value;
    let output = pack_js(input, 0);
    outputArea.value = output;
}

function htmlJsEncrypte() {
    let input = inputArea.value;
    let output = pack_js(input, 1);
    outputArea.value = output;
}

function cssFormat() {
    let input = inputArea.value;
    let output = input.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    output = output.replace(/;\s*;/g, ";");                         // 清除連續分號
    output = output.replace(/\,[\s\.\#\d]*{/g, "{");
    output = output.replace(/([^\s])\{([^\s])/g, "$1 {\n    $2");
    output = output.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
    output = output.replace(/([^\s]);([^\s\}])/g, "$1;\n    $2");
    /* 橫向排列 */
    // output = output.replace(/(\r|\n|\t)/g, "");
    // output = output.replace(/(})/g, "$1\r\n");
    outputArea.value = output;
}

function cssCompress() {
    let input = inputArea.value;
    let output = input.replace(/\/\*(.|\n)*?\*\//g, "");            // 刪除注釋
    output = output.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    output = output.replace(/\,[\s\.\#\d]*\{/g, "{");               // 容錯處理
    output = output.replace(/;\s*;/g, ";");                         // 清除連續分號
    output = output.match(/^\s*(\S+(\s+\S+)*)\s*$/);                // 去掉首尾空白
    outputArea.value = output;
}

function pack_js(input, base64) {
    let packer = new Packer;
    let output;
    if (base64) {
        output = packer.pack(input, 1, 0);
    } else {
        output = packer.pack(input, 0, 0);
    }
    return output;
}