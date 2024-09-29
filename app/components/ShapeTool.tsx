import * as fabric from "fabric";
const widthitem = 100;
const heightitem = 100;
export const createRectangle = (canvas: fabric.Canvas) => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  const rect = new fabric.Rect({
    // center area
    left: (canvasWidth - widthitem) / 2,
    top: (canvasHeight - heightitem) / 2,
    fill: "#DBD6C8",
    height: widthitem,
    width: heightitem,
    origin: "center",
  });

  canvas.add(rect);
  canvas.renderAll();
};
export const createCircle = (canvas: fabric.Canvas) => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  const circle = new fabric.Circle({
    left: (canvasWidth - widthitem) / 2,
    top: (canvasHeight - heightitem) / 2,
    fill: "#DBD6C8",
    height: widthitem,
    width: heightitem,
    origin: "center",
    radius: 50,
  });

  canvas.add(circle);
  canvas.renderAll();
};
export const createTriangle = (canvas: fabric.Canvas) => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  const triangle = new fabric.Triangle({
    left: (canvasWidth - widthitem) / 2,
    top: (canvasHeight - heightitem) / 2,
    fill: "#DBD6C8",
    height: widthitem,
    width: heightitem,
    origin: "center",
  });

  canvas.add(triangle);
  canvas.renderAll();
};
export const createTextbox = (canvas: fabric.Canvas) => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  const textbox = new fabric.Textbox("Republic of VietNam", {
    left: (canvasWidth - widthitem) / 2,
    top: (canvasHeight - heightitem) / 2,
    backgroundColor: "transparent",
    fontSize: 20,
    fontFamily: "Times New Roman",
    width: 200,
    origin: "center",
    splitByGrapheme: false,
  });
  textbox.set({
    width: Math.max(textbox.width, textbox.calcTextWidth()) + 20,
  });
  canvas.add(textbox);
  canvas.renderAll();
};
export const createImg = (canvas: fabric.Canvas, imgURL: HTMLImageElement) => {
  const imgExport = new fabric.FabricImage(imgURL, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    opacity: 1,
    cornerSize: 10,
  });
  imgExport.scaleToWidth(400);
  canvas.add(imgExport);
  canvas.renderAll();
};
