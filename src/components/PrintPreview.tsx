import { Printer, Download, X } from "lucide-react";
import type { Product } from "../services/productService";
import "./PrintPreview.css";
import { createPortal } from "react-dom";

interface PrintPreviewProps {
  products: Product[];
  country: {
    code: string;
    english: string;
    arabic: string;
  };
  onClose: () => void;
}

export default function PrintPreview({products,country,onClose,}: PrintPreviewProps) {
  function handlePrint() {
    window.print();
  }

  return createPortal(
    <div className="preview-overlay">
      <div className="preview-toolbar no-print">
        <div>
          <h2>Print Preview</h2>
          <p>A4 portrait · {products.length} labels</p>
        </div>

        <div className="preview-actions">
          <button
            className="preview-button secondary"
            onClick={onClose}
          >
            <X size={17} />
            Close
          </button>

          <button
            className="preview-button secondary"
            onClick={handlePrint}
          >
            <Download size={17} />
            Save as PDF
          </button>

          <button
            className="preview-button primary"
            onClick={handlePrint}
          >
            <Printer size={17} />
            Print
          </button>
        </div>
      </div>

      <div className="paper-container">
            <div className={`a4-paper labels-${products.length}`}>
                {products.map((product, index) => (
                    <div
                    className="product-label"
                    key={`${product.barcode}-${index}`}
                    >
                    <div className="label-arabic-price">
                        {product.arabicPrice}
                    </div>

                  <div className="currency-row">
                    <span>KD:</span>
                    <span className="currency-line"></span>
                    <span dir="rtl">د.ك</span>
                   </div>
 
                    <div className="label-price">
                        {Number(product.sellingPrice).toFixed(3)}
                    </div>

                    <div className="label-arabic" dir="rtl">
                        {product.arabicShortName}
                    </div>

                    <div className="label-english">
                        {product.englishShortName}
                    </div>
                    </div>
                ))}
                  <div className="label-country">
                      <span>{country.english}</span>
                      <span> - </span>
                      <span>{country.arabic}</span>
                  </div>
            </div>
       
      </div>
    </div>,
     document.body
  );
}