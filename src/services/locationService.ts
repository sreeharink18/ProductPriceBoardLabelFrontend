export interface Location{
    locCode : string,
    locName: string
}

const apiUrl = "http://172.16.4.205:7000/api/ExpiryReport/GetLocations"

export async function getLocations() : Promise<Location[]> {
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
    throw new Error(`locations not found.`);
  }

  const data : Location[] = await response.json();
  return data;
}