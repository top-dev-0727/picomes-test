import BreweriesTable from "./BreweriesTable";


export default async function Home() {
  const res = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=200');
  const data = await res.json();

  return <BreweriesTable breweries={data} />;
}