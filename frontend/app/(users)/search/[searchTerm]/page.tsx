import React from "react";

type PageProps = {
  params: {
    searchTerm: string;
  };
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function findTerm(data: any, searchTerm: string) {
  const results = [];
  for (const json of data) {
    const title: string = json["title"];
    if (title.indexOf(searchTerm) != -1) {
      results.push(json);
    }
  }
  return results;
}

async function Search(searchTerm: string) {
  const res = await fetch("http://localhost:8888/todos");
  const data = await res.json();
  const results = await findTerm(data, searchTerm);
  await delay(1000);
  return results;
}

async function SearchResults({ params: { searchTerm } }: PageProps) {
  const searchResults = await Search(searchTerm);

  return (
    <div>
      <header>Search Results</header>

      <div className="my-4">
        {searchResults.map((res) => (
          <p
            key={res.id}
            className="text-xl bg-slate-400 hover:bg-slate-300 rounded-md my-1 p-2"
          >
            {res.id}. {res.title}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
