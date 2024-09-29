"use client";

import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Button } from "@/components/ui/button";
import {
  createRectangle,
  createCircle,
  createTextbox,
  createTriangle,
  createImg,
} from "./ShapeTool";
import {
  RectangleHorizontal,
  Circle,
  TriangleRight,
  TypeIcon,
  ImagePlus,
  Pen,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { applyFilter } from "./ImageFilter";
const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [activeObjects, setActiveObject] = useState<fabric.FabricImage | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const filtertype = [
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
  useEffect(() => {
    if (canvasRef.current) {
      const canvasArea = new fabric.Canvas(canvasRef.current, {
        width: 1000,
        height: 700,
      });
      //add canvas area
      fabricCanvasRef.current = canvasArea;
      //delete
      const removeObject = (e: KeyboardEvent) => {
        if (e.key === "Delete" || e.key === "Backspace") {
          const activeObjects = canvasArea.getActiveObjects();
          if (activeObjects.length) {
            canvasArea.discardActiveObject();
            canvasArea.remove(...activeObjects);
            canvasArea.requestRenderAll();
          }
        }
      };

      window.addEventListener("keydown", removeObject);
      //zoom
      canvasArea.on("mouse:wheel", (opt) => {
        const evt = opt.e as WheelEvent;
        if (evt.ctrlKey) {
          const delta = opt.e.deltaY;
          let zoom = canvasArea.getZoom();
          zoom *= 0.999 ** delta;
          if (zoom > 20) zoom = 20;
          if (zoom < 0.01) zoom = 0.01;
          canvasArea.zoomToPoint(
            new fabric.Point(opt.e.offsetX, opt.e.offsetY),
            zoom
          );
          opt.e.preventDefault();
          opt.e.stopPropagation();
        }
      });
      canvasArea.on("selection:created", (e) => {
        const target = e.selected ? e.selected[0] : null;
        if (target && target.type === "image") {
          setActiveObject(target as fabric.FabricImage);
        } else {
          setActiveObject(null);
        }
      });
      canvasArea.on("selection:updated", (e) => {
        const target = e.selected ? e.selected[0] : null;
        if (target && target.type === "image") {
          setActiveObject(target as fabric.FabricImage);
        }
      });
      canvasArea.on("selection:cleared", () => {
        setActiveObject(null);
      });
      return () => {
        if (canvasArea) {
          canvasArea.dispose();
        }
        window.removeEventListener("keydown", removeObject);
      };
    }
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imgElement = new Image();
        imgElement.src = event.target?.result as string;

        imgElement.onload = () => {
          if (fabricCanvasRef.current) {
            createImg(fabricCanvasRef.current, imgElement);
          }
        };
      };

      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleAddRect = () => {
    if (fabricCanvasRef.current) {
      createRectangle(fabricCanvasRef.current);
    }
  };
  const handleAddCircle = () => {
    if (fabricCanvasRef.current) {
      createCircle(fabricCanvasRef.current);
    }
  };
  const handleAddTriangle = () => {
    if (fabricCanvasRef.current) {
      createTriangle(fabricCanvasRef.current);
    }
  };
  const handleAddText = () => {
    if (fabricCanvasRef.current) {
      createTextbox(fabricCanvasRef.current);
    }
  };
  // upload type file
  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgElement = new Image();
          imgElement.src = event.target?.result as string;
          imgElement.onload = () => {
            if (fabricCanvasRef.current) {
              createImg(fabricCanvasRef.current, imgElement);
            }
          };
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    //tool
    <div className="relative">
      <div className="flex gap-3 w-full justify-center mt-4">
        <Button variant="outline" size="icon" onClick={handleAddRect}>
          <RectangleHorizontal className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleAddCircle}>
          <Circle className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleAddTriangle}>
          <TriangleRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleAddText}>
          <TypeIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleFileUpload}>
          <ImagePlus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Pen className="h-4 w-4" />
        </Button>
{/* filter tool */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? filtertype.find((filtertype) => filtertype.value === value)
                    ?.label
                : "Select Filter"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search filter" />
              <CommandList>
                <CommandEmpty>No filter found.</CommandEmpty>
                <CommandGroup>
                  {filtertype.map((filtertype) => (
                    <CommandItem
                      key={filtertype.value}
                      value={filtertype.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                        applyFilter(activeObjects, filtertype.value, fabricCanvasRef.current!)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === filtertype.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {filtertype.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {/* canvas */}
      <div
        className="border-2 mt-8"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default FabricCanvas;
