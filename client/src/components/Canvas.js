import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState
} from "react";
import ExportPopup from "./ExportPopup";
import { useSelector, useDispatch } from "react-redux";

const Canvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);
  const [previousColor, setPreviousColor] = useState("#000000");
  const [showExportPopup, setShowExportPopup] = useState(false);
  const currentUser = useSelector((state) => state.user);
  const sessionId = useSelector((state) => state.session._id);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
    const scale = window.devicePixelRatio;
    canvas.width *= scale;
    canvas.height *= scale;

    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);
    contextRef.current = ctx;

    const fetchSession = async () => {
      const response = await fetch(
        `https://sketch-connect-be.onrender.com/sessions/${sessionId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const sessionData = await response.json();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  const handleColorChange = (e) => {
    const color = e.target.value;
    if (isErasing) {
      setPreviousColor(color);
    } else {
      setBrushColor(color);
    }
  };

  const handleSizeChange = (e) => {
    setBrushSize(parseInt(e.target.value));
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.strokeStyle = isErasing ? "#FFFFFF" : brushColor;
    contextRef.current.lineWidth = brushSize;
    contextRef.current.lineJoin = "round";
    contextRef.current.lineCap = "round";

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const handleMouseUp = () => {
    const canvas = canvasRef.current;
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseup", handleMouseUp);
  };

  const handleEraserToggle = () => {
    setIsErasing(!isErasing);
    if (!isErasing) {
      setPreviousColor(brushColor);
      setBrushColor("#FFFFFF");
    } else {
      setBrushColor(previousColor);
    }
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleExportClick = () => {
    setShowExportPopup(true);
  };

  const handleCloseExportPopup = () => {
    setShowExportPopup(false);
  };

  useImperativeHandle(ref, () => ({
    captureDrawing: () => {
      canvasRef.current.toBlob((blob) => {
        props.onCapture(blob);
      });
    }
  }));

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "canvas_image.png";
    link.click();
  };

  const handleShareOnSocialMedia = () => {
    console.log("Sharing on social media");
  };

  const getBorderStyle = () => {
    const playerIndex = session?.players?.indexOf(currentUser._id);
    let borderStyle = { border: "1px solid black" };
  
    switch (playerIndex) {
      case 1:
        borderStyle = { borderLeft: "1px dotted red", borderTop: "1px solid black" };
        break;
      case 2:
        borderStyle = { borderLeft: "1px solid black", borderTop: "1px dotted red" };
        break;
      case 3:
        borderStyle = { borderLeft: "1px dotted red", borderTop: "1px dotted red" };
        break;
      default:
        break;
    }
  
    return borderStyle;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
      }}
    >
      <div style={{ position: "relative", margin: "0px 0px"}}>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{ ...getBorderStyle(), borderRight: "1px solid black", borderBottom: "1px solid black" }}
          onMouseDown={handleMouseDown}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "10px",
            background: "#fff",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)"
          }}
        >
          <div>
            <label>Brush Color:</label>
            <input
              style={{ marginLeft: "10px" }}
              type="color"
              value={isErasing ? "#FFFFFF" : brushColor}
              onChange={handleColorChange}
            />
          </div>
          <div>
            <label>Brush Size:</label>
            <input
              style={{ marginLeft: "10px" }}
              type="range"
              min={1}
              max={20}
              value={brushSize}
              onChange={handleSizeChange}
            />
          </div>
          <div>
            <label>
              Eraser:
              <input
                type="checkbox"
                checked={isErasing}
                onChange={handleEraserToggle}
              />
            </label>
          </div>
          <div>
            <button
              style={{
                marginRight: "5px",
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
                background: "#008000",
                color: "#fff",
                cursor: "pointer"
              }}
              onClick={handleClearCanvas}
            >
              Clear Canvas
            </button>
            <button
              style={{
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
                background: "#0000FF",
                color: "#fff",
                cursor: "pointer"
              }}
              onClick={handleExportClick}
            >
              Export
            </button>
          </div>
        </div>
        {showExportPopup && (
          <ExportPopup
            handleDownloadImage={handleDownloadImage}
            handleShareOnSocialMedia={handleShareOnSocialMedia}
            handleCloseExportPopup={handleCloseExportPopup}
          />
        )}
      </div>
    </div>
  );
});

export default Canvas;
