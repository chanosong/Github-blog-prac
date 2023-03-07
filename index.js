function stripIndent(str) {
  const lines = str.split("\n");
  let minIndent = Infinity;

  // 첫 번째 줄 이후의 각 줄에서 가장 작은 들여쓰기 값을 찾습니다.
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const indent = line.search(/\S/); // 첫 번째 비공백 문자의 인덱스를 찾습니다.

    if (indent !== -1 && indent < minIndent) {
      minIndent = indent;
    }
  }

  // 모든 줄에서 가장 작은 들여쓰기 값을 뺍니다.
  if (minIndent !== Infinity) {
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].slice(minIndent);
    }
  }

  // 결과 문자열을 반환합니다.
  return lines.join("\n");
}

const Editor = toastui.Editor;

function katexPlugin() {
  const toHTMLRenderers = {
    katex(node) {
      console.log("HI");

      let html = katex.renderToString(node.literal, {
        throwOnError: false
      });

      return [
        { type: "openTag", tagName: "div", outerNewLine: true },
        { type: "html", content: html },
        { type: "closeTag", tagName: "div", outerNewLine: true }
      ];
    }
  };

  return { toHTMLRenderers };
}

// id가 'viewer-1-template' 인 엘리먼트를 찾는다.
const viewer1TemplateEl = document.querySelector("#viewer-1-template");
const viewer1MarkdownSource = stripIndent(viewer1TemplateEl.innerHTML); // 포함하고 있는 내용

console.log("viewer1MarkdownSource : " + viewer1MarkdownSource);

const viewer1 = Editor.factory({
  el: document.querySelector("#viewer-1"),
  viewer: true,
  initialValue: viewer1MarkdownSource,
  plugins: [
    [toastui.Editor.plugin.codeSyntaxHighlight, { highlighter: Prism }],
    katexPlugin,
    [
      toastui.Editor.plugin.uml,
      { rendererURL: "http://www.plantuml.com/plantuml/svg/" }
    ]
  ]
});
