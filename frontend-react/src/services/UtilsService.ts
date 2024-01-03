const mapCountryToAlpha2 = (countryName: string | undefined) => {
    if (countryName === undefined) {
        return 'RO';
    }

    // fill up the record if needed
    const countryMapping: Record<string, string> = {
        'germany': 'DE',
        'romania': 'RO',
        'united states of america': 'US',
    }

    return countryMapping[countryName.toLowerCase()] || countryName;
}

const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
};

const genres = [
    "MYSTERY", "SCIENCE_FICTION", "FANTASY", "ROMANCE", "THRILLER", "HORROR", "HISTORICAL_FICTION",
    "BIOGRAPHY", "NON_FICTION", "YOUNG_ADULT", "DYSTOPIAN", "ADVENTURE", "SCIENCE", "SELF_HELP",
    "FANTASY_ROMANCE", "HISTORICAL_ROMANCE", "CHILDRENS_FICTION", "COMEDY", "EROTICA", "POETRY",
    "CLASSICS", "CONTEMPORARY", "CRIME", "ESPIONAGE", "FAIRY_TALES", "FAMILY", "GRAPHIC_NOVELS",
    "HEALTH", "HUMOR", "INSPIRATIONAL", "LITERARY_FICTION", "MILITARY", "PARANORMAL", "PHILOSOPHY",
    "PSYCHOLOGY", "RELIGION", "SATIRE", "SHORT_STORIES", "SPORTS", "TRAVEL", "TRUE_CRIME", "URBAN_FICTION",
    "WESTERN", "WOMENS_FICTION", "BUSINESS", "COOKBOOKS", "CRAFTS", "DIY", "FASHION", "GARDENING"
];

const UtilsService = {
    mapCountryToAlpha2,
    formatDate,
    genres
};

export default UtilsService;