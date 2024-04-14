const cities = {
  BC: [
    "Vancouver",
    "Victoria",
    "Kelowna",
    "Nanaimo",
    "Kamloops",
    "Prince George",
    "Vernon",
    "Delta",
    "Surrey",
    "Richmond",
    "Burnaby",
    "New Westminster",
    "Coquitlam",
    "Langley",
    "Abbotsford",
    "Chilliwack",
    "Maple Ridge",
  ],
  ON: [
    "Toronto",
    "Ottawa",
    "Mississauga",
    "Brampton",
    "Hamilton",
    "London",
    "Markham",
    "Vaughan",
    "Kitchener",
    "Windsor",
  ],
  QB: [
    "Quebec City",
    "Montreal",
    "Gatineau",
    "Longueuil",
    "Sherbrooke",
    "Trois-Rivières",
    "Lévis",
    "Saguenay",
    "Saint-Jean-sur-Richelieu",
    "Terrebonne",
  ],
  MB: [
    "Winnipeg",
    "Selkirk",
    "Morden",
    "Winkler",
    "Dauphin",
    "Brandon",
    "Steinbach",
    "Thompson",
  ],
  AB: [
    "Edmonton",
    "Calgary",
    "Red Deer",
    "Lethbridge",
    "St. Albert",
    "Medicine Hat",
    "Grande Prairie",
    "Airdrie",
    "Spruce Grove",
    "Okotoks",
  ],
};

export const getRandomCity = (city) => {
  return cities[city][Math.floor(Math.random() * cities[city].length)];
};
