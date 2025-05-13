// jupyterlite-plugin-send-answer.js
const plugin = {
  id: "send-answer-button",
  autoStart: true,
  activate: (app) => {
    console.log("✅ Send Answer plugin for JupyterLite loaded.");

    const { shell, serviceManager } = app;
    const notebookTracker = app.serviceManager.sessions;

    app.commands.addCommand("send-answer:send", {
      label: "📤 Send Answer",
      execute: () => {
        const notebookPanel = app.shell.currentWidget;
        if (!notebookPanel) {
          alert("No active notebook.");
          return;
        }

        const notebook = notebookPanel.content;
        const cells = notebook.widgets;

        cells.forEach((cell) => {
          if (cell.model.type === "code") {
            const buttonExists = cell.node.querySelector(".send-answer-button");
            if (!buttonExists) {
              const button = document.createElement("button");
              button.textContent = "📤 Send";
              button.className = "send-answer-button";
              button.style.margin = "5px";

              button.onclick = () => {
                const code = cell.model.value.text;
                fetch("https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/submit", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    student: "student123",
                    code: code,
                  }),
                }).then((response) => {
                  if (response.ok) {
                    alert("✅ Answer sent!");
                  } else {
                    alert("❌ Error sending answer.");
                  }
                });
              };

              cell.node.querySelector(".jp-Cell-inputWrapper").prepend(button);
            }
          }
        });
      },
    });

    app.commands.execute("send-answer:send");
  },
};

export default plugin;
