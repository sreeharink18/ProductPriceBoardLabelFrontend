
import { useEffect, useState } from "react";
import { Barcode, Search, Printer } from "lucide-react";

import BarcodeInputs from "./components/BarcodeInputs";
import ProductTable from "./components/ProductTable";
import { getProduct } from "./services/productService";
import type { Product } from "./services/productService";


import "./App.css";
import PrintPreview from "./components/PrintPreview";
import {getLocations,type Location} from "./services/locationService";
import { countries } from "./data/countries";

function App() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [location, setLocation] = useState("");
  const [count, setCount] = useState(1);
  const [barcodes, setBarcodes] = useState([""]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productCountries, setProductCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  useEffect(() => {
    async function loadLocations() {
      try {
        setLocationLoading(true);
        setLocationError("");

        const data = await getLocations();

        setLocations(data);

        if (data.length > 0) {
          setLocation(data[0].locCode);
        }
      } catch (error) {
        setLocationError(
          error instanceof Error
            ? error.message
            : "Unable to load locations."
        );
      } finally {
        setLocationLoading(false);
      }
    }

    loadLocations();
  }, []);


  function handleCountChange(value: number) {
    setCount(value);

    setBarcodes((current) =>
      Array.from(
        { length: value },
        (_, index) => current[index] ?? ""
      )
    );

    setProducts([]);
    setProductCountries([]);
    setError("");
  }

  function handleBarcodeChange(index: number,value: string) {
    setBarcodes((current) =>
      current.map((barcode, i) => 
        i === index ? value : barcode
      )
    );
  }

  async function handleViewProducts() {
    const enteredBarcodes = barcodes.map((barcode) =>
      barcode.trim()
    );

    if (enteredBarcodes.some((barcode) => !barcode)) {
      setError("Please enter all barcode values.");
      return;
    }

    setLoading(true);
    setError("");
    setProducts([]);

    try {
      const results = await Promise.all(
        enteredBarcodes.map((barcode) =>
          getProduct(barcode, location)
        )
      );

      setProducts(results);
      setProductCountries(results.map(() => "")); 
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  }
  function handleProductCountryChange(index: number, code: string) {
  setProductCountries((current) =>
    current.map((c, i) => (i === index ? code : c))
  );
}

// Products with the chosen country added to both names
const labelProducts = products.map((product, index) => {
  const country = countries.find((c) => c.code === productCountries[index]);

    return {
    ...product,
    countryEnglish: country?.english ?? "",
    countryArabic: country?.arabic ?? "",
  };
});

  return (
    <main className="app-container">
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">
            <Barcode size={27} />
          </div>

          <div>
            <h1>Barcode Studio</h1>
            <p>Product labels & printing</p>
          </div>
        </div>

        <span className="status-badge">Product Labels</span>
      </header>

      <section className="welcome-section">
        <p className="eyebrow">LABEL MANAGEMENT</p>
        <h2>Create product labels</h2>
        <p>
          Enter product barcodes, review details, and
          prepare your labels for A4 printing.
        </p>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h3>Label configuration</h3>
            <p>Choose your location and barcode quantity.</p>
          </div>

          <Barcode size={23} />
        </div>

        <div className="settings-grid">
          {/* <div className="form-group">
            <label htmlFor="country">Country</label>

            <select
              id="country"
              value={selectedCountry}
              onChange={(event) => setSelectedCountry(event.target.value)}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.english} - {country.arabic}
                </option>
              ))}
            </select>
          </div> */}
          <div className="form-group">
            <label htmlFor="location">Store location</label>

            <select
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              disabled={locationLoading || locations.length === 0}
            >
              <option value="" disabled>
                {locationLoading
                  ? "Loading locations..."
                  : "Select a location"}
              </option>

              {locations.map((item) => (
                <option key={item.locCode} value={item.locCode}>
                  {item.locName}
                </option>
              ))}
            </select>

            {locationError && (
              <p className="error-message" role="alert">
                {locationError}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="count">Number of barcodes</label>

            <select
              id="count"
              value={count}
              onChange={(event) =>
                handleCountChange(Number(event.target.value))
              }
            >
              {[1, 2, 3, 4, 5].map((number) => (
                <option key={number} value={number}>
                  {number} {number === 1 ? "barcode" : "barcodes"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <BarcodeInputs
          count={count}
          barcodes={barcodes}
          onBarcodeChange={handleBarcodeChange}
        />

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <div className="action-row">
          <button
            className="primary-button"
            onClick={handleViewProducts}
            disabled={loading}
          >
            <Search size={18} />
            {loading ? "Loading products..." : "View Products"}
          </button>
        </div>
      </section>

      {products.length > 0 && (
        <section className="panel results-panel">
          <div className="panel-heading">
            <div>
              <h3>Product details</h3>
              <p>
                {products.length} product(s) loaded successfully.
              </p>
            </div>

            <button
              className="secondary-button"
              onClick={() => setShowPrintPreview(true)}
            >
              <Printer size={17} />
              Print Labels
            </button>
          </div>

          <ProductTable
            products={labelProducts}
            countries={countries}
            selectedCountries={productCountries}
            onCountryChange={handleProductCountryChange}
          />
        </section>
      )}
      {showPrintPreview && (
        <PrintPreview
          products={labelProducts}
          onClose={() => setShowPrintPreview(false)}
        />
      )}
    </main>
  );
}

export default App;