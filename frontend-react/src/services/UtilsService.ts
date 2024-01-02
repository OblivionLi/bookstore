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

const UtilsService = {
    mapCountryToAlpha2,
    formatDate
};

export default UtilsService;