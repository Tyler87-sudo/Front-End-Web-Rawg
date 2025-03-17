import Image from "next/image";

interface Game {
  id: number;
  name: string;
  slug: string;
  added: number;
  background_image?: string;
}

interface Platform {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  games: Game[];
}

interface PlatformsResponse {
  results: Platform[];
}

async function getPlatforms(): Promise<PlatformsResponse> {
  const API_KEY = "48f28e1f743841cead5122123c468993"; // Replace with your actual API key
  const response = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch platforms");
  return response.json();
}

async function fetchGameDetails(gameId: number): Promise<Game> {
  const API_KEY = "48f28e1f743841cead5122123c468993";
  const res = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch game details");
  const data = await res.json();
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    added: data.added,
    background_image: data.background_image,
  };
}

export default async function Home() {
  const platformsData = await getPlatforms();
  const selectedPlatforms = ["pc", "playstation4", "xbox-one"]; 

  const platformsWithGames = await Promise.all(
    platformsData.results
      .filter((platform) => selectedPlatforms.includes(platform.slug)) 
      .map(async (platform) => {
        const gamesWithImages = await Promise.all(
          platform.games.map((game) => fetchGameDetails(game.id))
        );
        return { ...platform, games: gamesWithImages };
      })
  );

  return (
    <div className="space-y-10 p-4">
      {platformsWithGames.map((platform) => (
        <div key={platform.id} className="grid gap-4 grid-cols-6">
          <div className="col-span-full text-center">
            <h1 className="text-2xl font-bold">Popular Games On {platform.name}</h1>
          </div>
          {platform.games.map((game) => (
            <div key={game.id} className="text-center">
              <h2 className="text-lg font-semibold">{game.name}</h2>
              {game.background_image && (
                <Image
                  src={game.background_image}
                  alt={game.name}
                  width={400}
                  height={225}
                  className="rounded-lg shadow-md"
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

