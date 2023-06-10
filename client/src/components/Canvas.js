import React, { useRef, useEffect, useState } from 'react';
import ExportPopup from './ExportPopup';

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);
  const [previousColor, setPreviousColor] = useState('#000000');
  const [showExportPopup, setShowExportPopup] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    contextRef.current = ctx;
    drawLines(ctx, canvas.width, canvas.height);
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
    contextRef.current.strokeStyle = isErasing ? '#FFFFFF' : brushColor;
    contextRef.current.lineWidth = brushSize;
    contextRef.current.lineJoin = 'round';
    contextRef.current.lineCap = 'round';

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
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
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseup', handleMouseUp);
  };

  const handleEraserToggle = () => {
    setIsErasing(!isErasing);
    if (!isErasing) {
      setPreviousColor(brushColor);
      setBrushColor('#FFFFFF');
    } else {
      setBrushColor(previousColor);
    }
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLines(context, canvas.width, canvas.height);
  };

  const handleExportClick = () => {
    setShowExportPopup(true);
  };

  const handleCloseExportPopup = () => {
    setShowExportPopup(false);
  };

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'canvas_image.png';
    link.click();
  };

  const handleShareOnSocialMedia = () => {
    // Implement your logic to share the canvas image on social media
    console.log('Sharing on social media');
  };

  const drawLines = (ctx, width, height) => {
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

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
  };

  const getInchesAsPixels = () => {
    // Assuming 96 pixels per inch (standard screen resolution)
    return 96 * 2;
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{ border: '1px solid #000' }}
          onMouseDown={handleMouseDown}
        />
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            padding: '10px',
            background: '#fff',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div>
            <label>Brush Color:</label>
            <input
              style={{ marginLeft: '10px' }}
              type="color"
              value={isErasing ? '#FFFFFF' : brushColor}
              onChange={handleColorChange}
            />
          </div>
          <div>
            <label>Brush Size:</label>
            <input
              style={{ marginLeft: '10px' }}
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
                marginRight: '5px',
                padding: '5px 10px',
                border: 'none',
                borderRadius: '5px',
                background: '#008000',
                color: '#fff',
                cursor: 'pointer',
              }}
              onClick={handleClearCanvas}
            >
              Clear Canvas
            </button>
            <button
              style={{
                padding: '5px 10px',
                border: 'none',
                borderRadius: '5px',
                background: '#0000FF',
                color: '#fff',
                cursor: 'pointer',
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
};

export default Canvas;
