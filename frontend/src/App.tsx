import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import AddPlayer from "./components/AddPlayer";
import PlayerList from "./components/PlayerList";
import AddTeam from "./components/AddTeam";
import TeamList from "./components/TeamList";
import GenerateTeams from "./components/GenerateTeam";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Random Team Generator</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Players</h2>
            <AddPlayer />
            <PlayerList />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Teams</h2>
            <AddTeam />
            <TeamList />
          </div>
        </div>
        <div className="mt-8">
          <GenerateTeams />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
