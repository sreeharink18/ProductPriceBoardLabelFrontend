
interface BarcodeInputsProps {
  count: number;
  barcodes: string[];
  onBarcodeChange: (index: number, value: string) => void;
}

export default function BarcodeInputs({count,barcodes,onBarcodeChange,}: BarcodeInputsProps) {
  return (
    <div className="barcode-grid">
      {Array.from({ length: count }, (_, index) => (
        <div className="form-group" key={index}>
          <label htmlFor={`barcode-${index}`}>
            Barcode {index + 1}
          </label>

          <input
            id={`barcode-${index}`}
            type="text"
            placeholder="Enter product barcode"
            value={barcodes[index] ?? ""}
            onChange={(event) =>
              onBarcodeChange(index, event.target.value)
            }
          />
        </div>
      ))}
    </div>
  );
}