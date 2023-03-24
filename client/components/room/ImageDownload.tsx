import { ChangeEvent, useRef, useState } from "react";
import Modal from "react-modal";
import Button from "./Button";

interface Props {
  canvasURL: string | undefined;
  onClose: () => void;
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function ImageDownload({ canvasURL, onClose, ...rest }: Props) {
  const [bgColor, setBgColor] = useState("bg-transparent");
  const [saveAsName, setSaveAsName] = useState("ideal idea");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSaveAsChage = (e: ChangeEvent<HTMLInputElement>) => {
    setSaveAsName(e.target.value);
  };

  const handleBgColorChange = (value: string) => {
    const ctx = canvasRef.current?.getContext("2d")!;
    if (value === "white") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      setBgColor("bg-white");
      return;
    }
    setBgColor("bg-transparent");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const handleDownloadClick = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    if (!canvasURL) return;
    const img = new Image();
    img.src = canvasURL;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const imageURL = canvas.toDataURL();
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = saveAsName;
      link.click();
      onClose();
    };
  };

  const handleAfterClose = () => {
    handleBgColorChange("bg-transparent");
    setSaveAsName("ideal idea");
  };

  return (
    <Modal
      {...rest}
      onAfterOpen={handleAfterClose}
      style={{
        overlay: {
          backgroundColor: "#000000ba",
          zIndex: 20,
        },
      }}
      className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-sm text-white z-50"
    >
      <div className="flex">
        <div className="w-[600px] relative bg-navy-900">
          <div className={`w-[600px] h-[450px] ${bgColor}`} />
          <img
            src={canvasURL}
            alt="캔버스 그림"
            className="absolute top-0 left-0"
          />
        </div>
        <div className="w-[200px] bg-navy-800 p-3 flex flex-col justify-between shrink-0">
          <div>
            <h2 className="my-1">배경색</h2>
            <div className="my-2">
              <input
                type="radio"
                name="bg-color"
                id="transparent"
                value="transparent"
                onChange={(e) => handleBgColorChange(e.target.value)}
                checked={bgColor === "bg-transparent"}
              />
              <label htmlFor="transparent" className="ml-2 cursor-pointer">
                투명
              </label>
            </div>
            <div className="my-2">
              <input
                type="radio"
                name="bg-color"
                id="white"
                value="white"
                onChange={(e) => handleBgColorChange(e.target.value)}
                checked={bgColor === "bg-white"}
              />
              <label htmlFor="white" className="ml-2 cursor-pointer">
                하얀색
              </label>
            </div>
            <h2 className="my-1">저장명</h2>
            <input
              type="text"
              onChange={handleSaveAsChage}
              defaultValue={saveAsName}
              className="w-full bg-navy-700 outline-none p-2 my-1"
            />
          </div>
          <Button bgColor="pink" onClick={handleDownloadClick}>
            다운로드
          </Button>
          <canvas ref={canvasRef} width={800} height={600} className="hidden" />
        </div>
      </div>
    </Modal>
  );
}

Modal.setAppElement("#__next");
