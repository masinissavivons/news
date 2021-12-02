export default function (favorite = [], action) {

  if (action.type == "addToFavorite") {
    let newFavorite = [...favorite, action.articleAddedToFavorite];
    return newFavorite;

  } else if (action.type == "removeFromFavorite") {
    let newFavorite = favorite.filter((e) => (e != action.articleRemoved));
    return newFavorite;

  } else if (action.type == "updateStoreFromDb") {
    let updatedFavorites = [...action.updatedArticles];
    return updatedFavorites;
  } else {
    return favorite;
  }
}
