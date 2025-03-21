export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '661ab3981bmsh710f2d6d68414cfp1d0c2fjsn563ad9c48ece',
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': '29f0b35bd6msh8025fbd2da626f6p1a02edjsna9c31ce4d42c',
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
