import Image from "next/image";

interface GameDetails {
  id: number;
  name: string;
  background_image: string;
  description: string;
  released: string;
  platforms: { platform: { name: string } }[];
  developers: { name: string }[];
  publishers: { name: string }[];
  genres: { name: string }[];
  rating: number;
}

async function fetchGameDetails(id: string) {
  const API_KEY = "48f28e1f743841cead5122123c468993";
  const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch game details");
  return res.json();
}

export default async function GameDetail({ params }: { params: { id: string } }) {
  const game: GameDetails = await fetchGameDetails(params.id);

  return (
    <div className="p-4 gap-5 grid grid-cols-1 grid-rows-4">
        <div>
        <h1 className="text-3xl font-bold" style={{marginBottom: "2%"}}>{game.name}</h1>
        <Image src={game.background_image} alt={game.name} width={800} height={400} />
        </div>
 
      <p className="mt-2">{game.description.replace(/<[^>]+>/g, "")}</p>
      <p><strong>Released:</strong> {game.released}</p>
      <p><strong>Platforms:</strong> {game.platforms.map(p => p.platform.name).join(", ")}</p>
      <p><strong>Developers:</strong> {game.developers.map(d => d.name).join(", ")}</p>
      <p><strong>Publishers:</strong> {game.publishers.map(p => p.name).join(", ")}</p>
      <p><strong>Genres:</strong> {game.genres.map(g => g.name).join(", ")}</p>
      <p><strong>Rating:</strong> {game.rating} / 5</p>
    </div>
  );
}
