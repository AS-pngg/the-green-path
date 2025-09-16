import { ShoppingCart, Info, Wrench, Zap } from "lucide-react";
import { useState } from "react";

interface CityItem {
  id: number;
  name: string;
  type: "animal" | "plant" | "structure";
  biome: "forest" | "ocean" | "urban";
  pointCost: number;
  description: string;
  emoji: string;
  owned: boolean;
  placed: boolean;
}

interface VirtualCityPageProps {
  userPoints: number;
}

const VirtualCityPage = ({ userPoints }: VirtualCityPageProps) => {
  const [selectedBiome, setSelectedBiome] = useState<"forest" | "ocean" | "urban">("forest");
  const [showShop, setShowShop] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CityItem | null>(null);

  const mockItems: CityItem[] = [
    {
      id: 1,
      name: "Oak Tree",
      type: "plant",
      biome: "forest",
      pointCost: 100,
      description: "Strong tree that absorbs CO2 and provides oxygen",
      emoji: "🌳",
      owned: true,
      placed: true,
    },
    {
      id: 2,
      name: "Tiger",
      type: "animal",
      biome: "forest",
      pointCost: 300,
      description: "Endangered big cat that needs forest protection",
      emoji: "🐅",
      owned: true,
      placed: true,
    },
    {
      id: 3,
      name: "Solar Panel",
      type: "structure",
      biome: "urban",
      pointCost: 200,
      description: "Clean energy source that reduces carbon footprint",
      emoji: "⚡",
      owned: true,
      placed: false,
    },
    {
      id: 4,
      name: "Coral Reef",
      type: "plant",
      biome: "ocean",
      pointCost: 250,
      description: "Marine ecosystem that supports ocean biodiversity",
      emoji: "🪸",
      owned: false,
      placed: false,
    },
    {
      id: 5,
      name: "Dolphin",
      type: "animal",
      biome: "ocean",
      pointCost: 400,
      description: "Intelligent marine mammal indicator of ocean health",
      emoji: "🐬",
      owned: false,
      placed: false,
    },
  ];

  const placedItems = mockItems.filter(item => item.placed && item.biome === selectedBiome);
  const shopItems = mockItems.filter(item => !item.owned);

  const handleItemClick = (item: CityItem) => {
    setSelectedItem(item);
  };

  const handlePurchase = (item: CityItem) => {
    if (userPoints >= item.pointCost) {
      // In real app, this would update Supabase
      console.log(`Purchasing ${item.name} for ${item.pointCost} points`);
    }
  };

  const biomes = [
    { id: "forest", name: "Forest", emoji: "🌲", color: "pixel-forest" },
    { id: "ocean", name: "Ocean", emoji: "🌊", color: "pixel-ocean" },
    { id: "urban", name: "Urban", emoji: "🏙️", color: "pixel-earth" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="card-pixel mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-pixel text-xl text-foreground">
              🌍 MY ECO CITY
            </h1>
            <div className="flex items-center gap-4">
              <div className="font-pixel text-sm text-pixel-warning">
                💰 {userPoints} Points
              </div>
              <button 
                onClick={() => setShowShop(!showShop)}
                className="btn-pixel-secondary flex items-center gap-2"
              >
                <ShoppingCart size={16} />
                SHOP
              </button>
            </div>
          </div>
          <p className="font-pixel text-xs text-muted-foreground">
            Build your sustainable city! Place 3D animals and plants in different biomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Biome Selection */}
          <div className="card-pixel">
            <h2 className="font-pixel text-sm text-foreground mb-4">
              SELECT BIOME
            </h2>
            <div className="space-y-3">
              {biomes.map((biome) => (
                <button
                  key={biome.id}
                  onClick={() => setSelectedBiome(biome.id as any)}
                  className={`nav-pixel w-full flex items-center gap-3 p-3 ${
                    selectedBiome === biome.id ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  <span className="text-lg">{biome.emoji}</span>
                  <span className="font-pixel text-xs">{biome.name}</span>
                </button>
              ))}
            </div>

            {/* Maintenance Tasks */}
            <div className="mt-6 bg-muted p-3 border border-border">
              <h3 className="font-pixel text-xs text-foreground mb-3 flex items-center gap-2">
                <Wrench size={12} />
                DAILY TASKS
              </h3>
              <div className="space-y-2">
                <button className="btn-pixel-success w-full text-[10px]">
                  💧 Water Plants (+10 pts)
                </button>
                <button className="btn-pixel w-full text-[10px]">
                  🍃 Clean Air (+5 pts)
                </button>
              </div>
            </div>
          </div>

          {/* 3D City Canvas */}
          <div className="lg:col-span-2 card-pixel">
            <h2 className="font-pixel text-sm text-foreground mb-4">
              {biomes.find(b => b.id === selectedBiome)?.emoji} {selectedBiome.toUpperCase()} BIOME
            </h2>
            
            <div className="canvas-pixel h-96 flex flex-col items-center justify-center relative">
              {/* 3D Placeholder */}
              <div className="text-center mb-4">
                <div className="font-pixel text-sm text-muted-foreground mb-2">
                  3D BIOME VIEW
                </div>
                <div className="font-pixel text-xs text-muted-foreground">
                  {placedItems.length === 0 
                    ? "No items placed yet" 
                    : `${placedItems.length} items in this biome`
                  }
                </div>
              </div>

              {/* Placed Items Grid */}
              {placedItems.length > 0 && (
                <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
                  {placedItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="canvas-pixel h-20 flex flex-col items-center justify-center hover:bg-muted transition-colors"
                    >
                      <span className="text-2xl mb-1">{item.emoji}</span>
                      <span className="font-pixel text-[8px] text-center">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Disaster Overlay Example */}
              <div className="absolute top-4 right-4">
                <div className="disaster-alert p-2">
                  <span className="font-pixel text-[8px]">⚠️ FLOOD RISK</span>
                </div>
              </div>
            </div>

            {/* 3D Instructions */}
            <div className="mt-4 bg-muted p-3 border border-border">
              <p className="font-pixel text-[10px] text-muted-foreground leading-relaxed">
                💡 TIP: In the full version, you'll see 3D models of animals and plants that you can drag and drop! 
                Click items to learn about their environmental impact.
              </p>
            </div>
          </div>

          {/* Info Panel / Shop */}
          <div className="card-pixel">
            {showShop ? (
              <>
                <h2 className="font-pixel text-sm text-foreground mb-4">
                  🛒 ECO SHOP
                </h2>
                <div className="space-y-3">
                  {shopItems.map((item) => (
                    <div key={item.id} className="bg-muted p-3 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{item.emoji}</span>
                        <span className="font-pixel text-xs">{item.name}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-pixel text-[10px] text-pixel-warning">
                          {item.pointCost} pts
                        </span>
                        <span className={`font-pixel text-[8px] px-2 py-1 ${
                          item.biome === "forest" ? "difficulty-easy" :
                          item.biome === "ocean" ? "btn-pixel-secondary" : "difficulty-medium"
                        }`}>
                          {item.biome}
                        </span>
                      </div>
                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={userPoints < item.pointCost}
                        className={`btn-pixel w-full text-[10px] ${
                          userPoints < item.pointCost ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {userPoints >= item.pointCost ? "BUY" : "NOT ENOUGH POINTS"}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : selectedItem ? (
              <>
                <h2 className="font-pixel text-sm text-foreground mb-4 flex items-center gap-2">
                  <Info size={16} />
                  ITEM INFO
                </h2>
                <div className="text-center mb-4">
                  <span className="text-4xl">{selectedItem.emoji}</span>
                </div>
                <h3 className="font-pixel text-sm text-foreground mb-2">
                  {selectedItem.name}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between font-pixel text-xs">
                    <span>Type:</span>
                    <span className="capitalize">{selectedItem.type}</span>
                  </div>
                  <div className="flex justify-between font-pixel text-xs">
                    <span>Biome:</span>
                    <span className="capitalize">{selectedItem.biome}</span>
                  </div>
                  <div className="flex justify-between font-pixel text-xs">
                    <span>Cost:</span>
                    <span className="text-pixel-warning">{selectedItem.pointCost} pts</span>
                  </div>
                </div>
                <p className="font-pixel text-[10px] text-muted-foreground leading-relaxed">
                  {selectedItem.description}
                </p>
              </>
            ) : (
              <>
                <h2 className="font-pixel text-sm text-foreground mb-4">
                  🏗️ CITY STATS
                </h2>
                <div className="space-y-3">
                  <div className="bg-muted p-3 border border-border">
                    <div className="flex justify-between items-center">
                      <span className="font-pixel text-xs">CO2 Absorbed</span>
                      <span className="font-digital text-sm text-pixel-success">+150kg</span>
                    </div>
                  </div>
                  <div className="bg-muted p-3 border border-border">
                    <div className="flex justify-between items-center">
                      <span className="font-pixel text-xs">Animals Saved</span>
                      <span className="font-digital text-sm text-pixel-forest">3</span>
                    </div>
                  </div>
                  <div className="bg-muted p-3 border border-border">
                    <div className="flex justify-between items-center">
                      <span className="font-pixel text-xs">Clean Energy</span>
                      <span className="font-digital text-sm text-pixel-warning">25%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-pixel text-xs text-foreground mb-3">
                    NEXT UNLOCK
                  </h3>
                  <div className="bg-muted p-3 border border-border">
                    <span className="font-pixel text-[10px] text-muted-foreground">
                      🦋 Butterfly Garden - Complete 3 more levels
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualCityPage;