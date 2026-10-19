import type { Product } from "../services/productService";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({
  products,
}: ProductTableProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>English Name</th>
            <th>Arabic Name</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr key={`${product.barcode}-${index}`}>
              <td>{product.barcode}</td>
              <td>{product.englishShortName}</td>
              <td className="arabic" dir="rtl">
                {product.arabicShortName}
              </td>
              <td>{product.sellingPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}