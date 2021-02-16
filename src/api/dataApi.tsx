import localData32 from './localData/localData32';

async function getData(link:string ) {
  try {
    const response = await fetch(link);
    const responseData = await response.json();
    return responseData;
  } catch {
    return localData32;
  }
}

export default getData;
