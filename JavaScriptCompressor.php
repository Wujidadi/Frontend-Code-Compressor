<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>JavaScript 加密壓縮</title>
    <style>
        * {
            box-sizing: border-box;
        }
        div#main, div#button {
            display: flex;
            width: 100%;
            flex-direction: row;
            justify-content: space-around;
            align-items: flex-start;
        }
        .half {
            display: inline-block;
            width: calc(50vw - 26px);
        }
        .input-label {
            width: 100%;
            line-height: 1.5rem;
            text-align: center;
        }
        #input-mark {
            background: #dd321c;
        }
        #output-mark {
            background: #4352e0;
            color: #fff;
        }
        .jscode {
            width: 100%;
            height: 50vh;
            resize: vertical;
            font-family: monospace;
            font-size: 1rem;
        }
        .btn {
            display: inline-block;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            user-select: none;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            color: #fff;
            background-color: #28a745;
            border-color: #28a745;
            cursor: pointer;
            width: 100%;
            margin: 0 8px;
        }
        .btn:hover {
            color: #fff;
            background-color: #218838;
            border-color: #1e7e34;
        }
    </style>
    <script src="base.js"></script>
</head>
<body>
    <div id="main">
        <div class="half">
            <div class="input-label" id="input-mark">Input</div>
            <textarea class="jscode" id="input"></textarea>
        </div>
        <div class="half">
            <div class="input-label" id="output-mark">Output</div>
            <textarea class="jscode" id="output" readonly></textarea>
        </div>
    </div>
    <div id="button">
        <button class="btn" id="compress">一般壓縮</button>
        <button class="btn" id="encrypt">加密壓縮</button>
    </div>
    <script>
        const inputArea = document.querySelector("#input"),
              outputArea = document.querySelector("#output"),
              compress = document.querySelector("#compress"),
              encrypt = document.querySelector("#encrypt");

        compress.addEventListener('click', function() {
            let input = inputArea.value;
            let output = pack_js(input, 0);
            outputArea.value = output;
        });

        encrypt.addEventListener('click', function() {
            let input = inputArea.value;
            let output = pack_js(input, 1);
            outputArea.value = output;
        });

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
    </script>
</body>
</html>