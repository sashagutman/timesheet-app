import type { FunctionComponent, MouseEvent } from "react";
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

  const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
    const context = getCanvasContext();
    if (!context) return;

    isDrawingRef.current = true;

    const { offsetX, offsetY } = event.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const draw = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;

    const context = getCanvasContext();
    if (!context) return;

    const { offsetX, offsetY } = event.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;

    const context = getCanvasContext();
    if (!context) return;

    isDrawingRef.current = false;
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
          width={400}
          height={200}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="signature-canvas"
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