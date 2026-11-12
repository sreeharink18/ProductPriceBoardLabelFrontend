export interface Location{
    locCode : string,
    locName: string
}

const apiUrl = "http://172.16.4.253:5000/api/Product/GetLocations"

export async function getLocations() : Promise<Location[]> {
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
    throw new Error(`locations not found.`);
  }

  const data : Location[] = await response.json();
  return data;
}