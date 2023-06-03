export const sortTicketsList = (data, method) => {
  switch (method) {
    case 'cheapest':
      return [...data].sort((a, b) => a.price - b.price);
    case 'fastest':
      return [...data].sort(
        (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
      );
    case 'optimal':
      return [...data].sort(
        (a, b) =>
          a.price -
          b.price +
          (a.segments[0].duration + a.segments[1].duration) -
          (b.segments[0].duration + b.segments[1].duration)
      );
    default:
      return data;
  }
};

export const getSelectedFilters = (obj) => {
  const keysSelectedFilters = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      keysSelectedFilters.push(key);
    }
  });
  return keysSelectedFilters;
};

export const applyFilters = (data, list) => {
  const selectedFilters = getSelectedFilters(list);
  if (!list.all) {
    return data.filter(
      (item) =>
        selectedFilters.includes(item.segments[0].stops.length.toString()) &&
        selectedFilters.includes(item.segments[1].stops.length.toString())
    );
  }
  return data;
};
