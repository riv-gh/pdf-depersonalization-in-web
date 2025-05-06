import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
import { jsPDF } from "jspdf";
import { getTranslation } from "./lang.js"; // Импортируем функцию getTranslation из i18n.js
import { getFormattedDate, invertColor } from "./tools.js"; // Импортируем функцию getFormattedDate из tools.js
import "./../styles/styles.css"; // Импортируем стили

// Устанавливаем локализацию
const undoText = getTranslation('ui.undo');
const resetText = getTranslation('ui.reset');
const pageText = getTranslation('ui.page');
const pdfSavePrefix = getTranslation('ui.pdfSavePrefix');
const noFileToSaveText = getTranslation('notification.noFileToSave');

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// Глобальные настройки кисти, которые применяются ко всем страницам
export const globalBrushSettings = {
  brushColor: "#ffffff",
  brushShape: "round",
  brushSize: 25,
  borderColor: "#000000",
};

// Массив для хранения конфигураций страниц
const pageConfigs = [];

// Вспомогательная функция для получения координат мыши относительно canvas
function getMousePos(evt, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

// Инициализация рисования на canvas с использованием настроек из pageConfig
function setupCanvasDrawing(pageConfig) {
  const { canvas, ctx } = pageConfig;
  let drawing = false;
  let lastPos = { x: 0, y: 0 };

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    lastPos = getMousePos(e, canvas);
    // Сохраняем состояние перед началом штриха для возможной отмены
    pageConfig.undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    const pos = getMousePos(e, canvas);
    ctx.strokeStyle = pageConfig.brushColor;
    ctx.lineWidth = pageConfig.brushSize;
    ctx.lineCap = pageConfig.brushShape;
    ctx.lineJoin = pageConfig.brushShape;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos = pos;
  });

  canvas.addEventListener("mouseup", () => (drawing = false));
  canvas.addEventListener("mouseout", () => (drawing = false));
}

// Обновляет глобальное свойство и применяет его ко всем конфигурациям страниц
function updateAllPages(property, value) {
  globalBrushSettings[property] = value;
  pageConfigs.forEach((pc) => {
    pc[property] = value;
  });
}

// Инициализация глобального меню — оно расположено в index.html
function initGlobalToolbar() {
  const colorPicker = document.getElementById("global-color-picker");
  colorPicker.addEventListener("change", (e) => {
    updateAllPages("brushColor", e.target.value);
    updateAllPages("borderColor", invertColor(e.target.value));
  });

  const sizeSlider = document.getElementById("global-size-slider");
  sizeSlider.addEventListener("input", (e) =>
    updateAllPages("brushSize", parseInt(e.target.value, 10))
  );

  const btnRound = document.getElementById("global-brush-round");
  const btnSquare = document.getElementById("global-brush-square");

  btnRound.addEventListener("click", () => {
    updateAllPages("brushShape", "round");
    btnRound.classList.add("active");
    btnSquare.classList.remove("active");
  });

  btnSquare.addEventListener("click", () => {
    updateAllPages("brushShape", "square");
    btnSquare.classList.add("active");
    btnRound.classList.remove("active");
  });
}

// Создание панели для действий страницы (без настроек кисти)
function createPageToolbar(pageConfig) {
  const toolbar = document.createElement("div");
  toolbar.classList.add("toolbar");

  // Кнопка отмены последнего действия
  const undoBtn = document.createElement("button");
  undoBtn.classList.add("t-undo-btn");
  undoBtn.textContent = undoText;
  undoBtn.addEventListener("click", () => {
    if (pageConfig.undoStack.length > 0) {
      const lastState = pageConfig.undoStack.pop();
      pageConfig.ctx.putImageData(lastState, 0, 0);
    }
  });

  // Кнопка сброса страницы (до начала рисования)
  const resetBtn = document.createElement("button");
  resetBtn.classList.add("t-reset-btn");
  resetBtn.textContent = resetText;
  resetBtn.addEventListener("click", () => {
    pageConfig.ctx.putImageData(pageConfig.originalImageData, 0, 0);
    pageConfig.undoStack = [];
  });

  toolbar.appendChild(undoBtn);
  toolbar.appendChild(resetBtn);
  return toolbar;
}

// Обработка выбора PDF-файла и последовательное рендеринг страниц
document.getElementById("file-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type === "application/pdf") {
    const reader = new FileReader();
    reader.onload = function (ev) {
      (async () => {
        const arrayBuffer = ev.target.result;
        const pdfDoc = await pdfjsLib
          .getDocument({ data: arrayBuffer })
          .promise;
        const pagesContainer = document.getElementById("pages-container");
        pagesContainer.innerHTML = ""; // Очистка предыдущих страниц

        // Последовательно обрабатываем страницы в правильном порядке
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d");

          const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };

          await page.render(renderContext).promise;

          // Сохраняем изображение страницы до рисования
          const originalImageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const pageConfig = {
            canvas: canvas,
            ctx: ctx,
            originalImageData: originalImageData,
            undoStack: [],
            brushColor: globalBrushSettings.brushColor,
            brushShape: globalBrushSettings.brushShape,
            brushSize: globalBrushSettings.brushSize,
          };

          pageConfigs.push(pageConfig);
          setupCanvasDrawing(pageConfig);
          const toolbar = createPageToolbar(pageConfig);

          // Создаём контейнер для страницы (номер, canvas и панель действий)
          const pageDiv = document.createElement("div");
          pageDiv.classList.add("page");
          const label = document.createElement("div");
          label.innerHTML = `<span class="t-page-text">${pageText}</span>: ${i}`;
          label.style.marginBottom = "5px";

          pageDiv.appendChild(label);
          pageDiv.appendChild(canvas);
          pageDiv.appendChild(toolbar);
          pagesContainer.appendChild(pageDiv);
        }
      })();
    };
    reader.readAsArrayBuffer(file);
  } else {
    alert(noFileToSaveText);
  }
});


// Сохранение PDF — для каждой страницы извлекается изображение из canvas
document.getElementById("save-btn").addEventListener("click", () => {
  const pdf = new jsPDF();
  const canvasPages = document.querySelectorAll(".page canvas");

  canvasPages.forEach((canvas, index) => {
    const imgData = canvas.toDataURL(
      "image/jpeg",
      +document.getElementById('save-quality-slider').value
    );
    if (index > 0) {
      pdf.addPage();
    }
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight)
  });
  pdf.save(`${pdfSavePrefix} - ${document.getElementById('file-input').files[0]?.name.replace(/\.pdf$/,'')||'null'} [${getFormattedDate()}].pdf`);
});

// Инициализируем глобальное меню сразу после загрузки документа
initGlobalToolbar();
