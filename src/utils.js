export const sortAlphabetically = (arr, key, isAsc) => {
  return arr.sort((a,b) => {
    const alc = a[key].toLowerCase(), 
          blc = b[key].toLowerCase();
    
    if (isAsc) {
      return alc > blc ? 1 : alc < blc ? -1 : 0;
    } else {
      return alc < blc ? 1 : alc > blc ? -1 : 0;
    }
   });
};

export const calcTotalPages = (items, per) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(items.length / per); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

export const addGenres = (restaurants) => {
  return restaurants.reduce((acc, locale) => {
    const genres = locale.genre.split(",");
    
    genres.forEach((g) => {
      if (!acc.find((item) => item === g)) {
        acc.push(g)
      }
    });
    
    return acc;
  }, []);
};

export const stateCodes = [
  'AL', 
  'AK',
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY' 
];
