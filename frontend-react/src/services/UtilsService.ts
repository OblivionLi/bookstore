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

const UtilsService = {
    mapCountryToAlpha2,
};

export default UtilsService;