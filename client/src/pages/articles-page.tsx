import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ExternalLink } from "lucide-react";
import { useState } from "react";

type Article = {
  title: string;
  source: string;
  link: string;
  category: string;
};

const academicResources: Article[] = [
  {
    title: "Google Scholar",
    source: "Google",
    link: "https://scholar.google.com",
    category: "Search Engine"
  },
  {
    title: "Science Direct",
    source: "Elsevier",
    link: "https://www.sciencedirect.com",
    category: "Scientific Database"
  },
  {
    title: "arXiv",
    source: "Cornell University",
    link: "https://arxiv.org",
    category: "Open Access"
  },
  {
    title: "JSTOR",
    source: "ITHAKA",
    link: "https://www.jstor.org",
    category: "Digital Library"
  },
  {
    title: "ResearchGate",
    source: "ResearchGate GmbH",
    link: "https://www.researchgate.net",
    category: "Academic Network"
  }
];

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(academicResources.map(r => r.category))];
  
  const filteredResources = academicResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Scientific Articles & Resources</h1>
      
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{resource.title}</span>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Source: {resource.source}
              </p>
              <p className="text-sm">
                Category: {resource.category}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
