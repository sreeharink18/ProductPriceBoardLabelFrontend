export interface Product {
  barcode: string;
  englishShortName: string;
  arabicShortName: string;
  sellingPrice: string;
  arabicPrice : string;
  countryEnglish?: string;
countryArabic?: string;
}
const API_URL = "http://172.16.4.253:5000/api/Product/checkprice";
function formatArabicPrice(value: string): string {
  return value.replace(/[?ʔ]/g, "٠");
}
//const API_URL = "/api/Product/checkprice";

export async function getProduct(
  barcode: string,
  location: string
): Promise<Product> {
  const query = new URLSearchParams({
    barcode,
    location,
  });

  const response = await fetch(`${API_URL}?${query}`);



  if (!response.ok) {
    throw new Error(`Product not found: ${barcode}`);
  }

  const data = await response.json();

  return {
    barcode: data.barcode,
    englishShortName: data.englishShortName,
    arabicShortName: data.arabicShortName,
    sellingPrice: data.sellingPrice,
    arabicPrice: formatArabicPrice(data.arabicPrice ?? "")
  };
}