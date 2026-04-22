import type { FunctionComponent, PointerEvent } from "react";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineCleaningServices } from "react-icons/md";
import { t } from "i18next";

interface SignatureModalProps {
  onSave: (dataUrl: string) => void;
  onClose: () => void;
}

const SignatureModal: FunctionComponent<SignatureModalProps> = ({
  onSave,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const context = canvas.getContext("2d");
    if (!context) return null;

    context.lineWidth = 2;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#000";

    return context;
  };

  const getPointerPosition = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault()

    const canvas = canvasRef.current;
    const context = getCanvasContext();
    const position = getPointerPosition(event);

    if (!canvas || !context || !position) return;

    isDrawingRef.current = true;

    canvas.setPointerCapture(event.pointerId);

    context.beginPath();
    context.moveTo(position.x, position.y);
  };

  const draw = (event: PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault()
    
    if (!isDrawingRef.current) return;

    const context = getCanvasContext();
    const position = getPointerPosition(event);

    if (!context || !position) return;

    context.lineTo(position.x, position.y);
    context.stroke();
  };

  const stopDrawing = (event?: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;

    const canvas = canvasRef.current;
    const context = getCanvasContext();

    if (!canvas || !context) return;

    isDrawingRef.current = false;

    if (event) {
      canvas.releasePointerCapture(event.pointerId);
    }

    context.closePath();
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl);
    onClose();
  };

  return (
    <div className="signature-modal">
      <div className="modal-content">
        <h3>{t("signature.signature")}</h3>

        <canvas
          ref={canvasRef}
          className="signature-canvas"
          width={400}
          height={200}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
        />

        <div className="modal-actions">
          <button type="button" className="signature-btn btn-clear-icon"
            onClick={clear}
            aria-label={t("signature.clear")}
          >
            <MdOutlineCleaningServices />
          </button>

          <button type="button" className="signature-btn btn-save"
            onClick={save}
          >
            {t("signature.save")}
          </button>

          <button type="button" className="signature-btn btn-close-icon"
            onClick={onClose}
            aria-label={t("signature.close")}
          >
            <IoClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureModal;