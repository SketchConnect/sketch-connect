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

  useEffect(() => {
    if (session) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      drawLines(ctx, canvas.width, canvas.height, session);
    }
  }, [session]);

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

    if (session) {
      drawLines(context, canvas.width, canvas.height);
    }
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

  const fetchAndDrawImage = async (
    url,
    index,
    sourceX,
    sourceY,
    destX,
    destY
  ) => {
    try {
      const response = await fetch(url);
      const session = await response.json();

      const image = new Image();
      image.crossOrigin = "anonymous";

      image.src = session.quadrants[index];

      image.onload = () => {
        const sourceWidth = image.naturalWidth;
        const sourceHeight = image.naturalHeight;

        const widthScale = contextRef.current.canvas.width / image.naturalWidth;
        const heightScale =
          contextRef.current.canvas.height / image.naturalHeight;

        const destWidth = sourceWidth * widthScale;
        const destHeight = sourceHeight * heightScale;

        if (contextRef.current) {
          contextRef.current.drawImage(
            image,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            destX,
            destY,
            destWidth,
            destHeight
          );
        }
      };

      image.onerror = (err) => {
        console.error("Failed to load image: ", err);
      };
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const drawLines = (ctx, width, height) => {
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    // switch statement - based on what player number
    // redux store for getsession/id - session object has array of players and match id == list of players in session

    // based on the switch - take appropriate quadrant image from bucket. (ask michelle)
    // extracting strip of image and overlaying it on next canvas.

    switch (session.players.indexOf(currentUser._id)) {
      case 0:
        // Vertical line
        ctx.beginPath();
        ctx.moveTo(width - 0.35 * getInchesAsPixels(), 0);
        ctx.lineTo(width - 0.35 * getInchesAsPixels(), height);
        ctx.stroke();

        // Horizontal line
        ctx.beginPath();
        ctx.moveTo(0, height - 0.35 * getInchesAsPixels());
        ctx.lineTo(width, height - 0.35 * getInchesAsPixels());
        ctx.stroke();

        ctx.setLineDash([]);
        break;

      case 1:
        fetchAndDrawImage(
          `https://sketch-connect-be.onrender.com/sessions/${sessionId}`,
          0,
          width - 0.35 * getInchesAsPixels(),
          0,
          0,
          0
        );

        // Horizontal line
        ctx.beginPath();
        ctx.moveTo(0, height - 0.35 * getInchesAsPixels());
        ctx.lineTo(width, height - 0.35 * getInchesAsPixels());
        ctx.stroke();

        ctx.setLineDash([]);
        break;

      case 2:
        fetchAndDrawImage(
          `https://sketch-connect-be.onrender.com/sessions/${sessionId}`,
          0,
          0,
          height - 0.35 * getInchesAsPixels(),
          0,
          0
        );

        // Vertical line
        ctx.beginPath();
        ctx.moveTo(width - 0.35 * getInchesAsPixels(), 0);
        ctx.lineTo(width - 0.35 * getInchesAsPixels(), height);
        ctx.stroke();

        ctx.setLineDash([]);
        break;

      case 3:
        fetchAndDrawImage(
          `https://sketch-connect-be.onrender.com/sessions/${sessionId}`,
          2,
          width - 0.35 * getInchesAsPixels(),
          0,
          0,
          0
        );
        fetchAndDrawImage(
          `https://sketch-connect-be.onrender.com/sessions/${sessionId}`,
          1,
          0,
          height - 0.35 * getInchesAsPixels(),
          0,
          0
        );
        break;
    }
  };

  const getInchesAsPixels = () => {
    return 96 * 2;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{ border: "1px solid #000" }}
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
