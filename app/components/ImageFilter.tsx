import { Canvas, FabricImage, filters } from "fabric";

export const applyFilter = (
  activeObject: FabricImage | null,
  filterType: string,
  canvas: Canvas
) => {
  if (activeObject) {
    let filter;
    switch (filterType) {
      case "grayscale":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.Grayscale();
        break;
      case "sepia":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.Sepia();
        break;
      case "brightness":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.Brightness({ brightness: 0.2 });
        break;
      case "contrast":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.Contrast({ contrast: 0.2 });
        break;
      case "invert":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.Invert();
        break;
      case "blur":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.Blur({ blur: 0.5 });
        break;
      case "pixelate":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.Pixelate({ blocksize: 8 });
        break;
      case "noise":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.Noise({ noise: 100 });
        break;
      case "saturation":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.Saturation({ saturation: 0.5 });
        break;
      case "hueRotation":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.HueRotation({ rotation: 45 });
        break;
      case "gamma":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.Gamma({ gamma: [1.5, 1.5, 1.5] });
        break;
      case "blackWhite":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.BlackWhite();
        break;
      case "sharpen":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.Convolute({
          matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
        });
        break;
      case "emboss":
        activeObject.filters = [];
        activeObject.applyFilters();
        filter = new filters.Convolute({
          matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
        });
        break;
      case "none":
        activeObject.filters = [];
        activeObject.applyFilters();
        canvas.requestRenderAll();
        return;
      default:
        return;
    }
    activeObject.filters = activeObject.filters
      ? [...activeObject.filters, filter]
      : [filter];
    activeObject.applyFilters();
    canvas.requestRenderAll();
  }
};
export const filtertype = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "grayscale",
    label: "Grayscale",
  },
  {
    value: "sepia",
    label: "Sepia",
  },
  {
    value: "brightness",
    label: "Brightness",
  },
  {
    value: "contrast",
    label: "Contrast",
  },
  {
    value: "invert",
    label: "Invert",
  },
  {
    value: "blur",
    label: "Blur",
  },
  {
    value: "pixelate",
    label: "Pixelate",
  },
  {
    value: "noise",
    label: "Noise",
  },
  {
    value: "saturation",
    label: "Saturation",
  },
  {
    value: "hueRotation",
    label: "Hue Rotation",
  },
  {
    value: "blackWhite",
    label: "Black & White",
  },
  {
    value: "sharpen",
    label: "Sharpen",
  },
  {
    value: "emboss",
    label: "Emboss",
  },
  {
    value: "gamma",
    label: "Gamma",
  },
];