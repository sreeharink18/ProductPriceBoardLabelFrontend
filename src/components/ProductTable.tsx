import type { Country } from "../data/countries";
import type { Product } from "../services/productService";
import './productTable.css'

interface ProductTableProps {
  products: Product[];
  countries: Country[];
  selectedCountries: string[];
  onCountryChange: (index: number, code: string) => void;
}

export default function ProductTable({
  products,
  countries,
  selectedCountries,
  onCountryChange,
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
            <th>Country</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr key={`${product.barcode}-${index}`}>
              <td>{product.barcode}</td>
              {/* <td>{product.englishShortName}</td>
              <td className="arabic" dir="rtl">
                {product.arabicShortName}
              </td> */}
              <td>
                {product.englishShortName}
                {product.countryEnglish && ` (${product.countryEnglish})`}
              </td>
              <td className="arabic" dir="rtl">
                {product.arabicShortName}
                {product.countryArabic && ` (${product.countryArabic})`}
              </td>
              <td>
               <select
                    className="country-select"
                    value={selectedCountries[index] ?? ""}
                    onChange={(event) =>
                        onCountryChange(index, event.target.value)
                    }
                >
                    <option value="">No country</option>

                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.english} - {country.arabic}
                        </option>
                    ))}
                </select>
              </td>
              <td>{product.sellingPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}