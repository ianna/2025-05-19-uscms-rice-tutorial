// jupyterlite-plugin-send-answer.js

define(["base/js/namespace", "jquery"], function(Jupyter, $) {

    function sendToAPI(code) {
        fetch("https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                student: "student123",
                code: code
            })
        }).then(response => {
            if (response.ok) {
                alert("✅ Answer sent!");
            } else {
                alert("❌ Error sending answer.");
            }
        });
    }

    function addSendButton() {
        Jupyter.notebook.get_cells().forEach(function(cell) {
            if (cell.cell_type === 'code') {
                if (!cell.metadata.has_button) {
                    var button = $('<button>📤 Send</button>').css({
                        'margin': '5px'
                    });
                    button.click(function() {
                        var code = cell.get_text();
                        sendToAPI(code);
                    });
                    cell.element.find('.input_prompt').after(button);
                    cell.metadata.has_button = true;
                }
            }
        });
    }

    function load_ipython_extension() {
        addSendButton();
        console.log("Send Answer button extension for JupyterLite loaded.");
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
