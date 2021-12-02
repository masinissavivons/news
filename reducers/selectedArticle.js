export default function (article="", action) {
  if (action.type == "selectedArticle") {
    let newArticle = action.selectedArticle;
    return newArticle;
  } else {
    return article;
  }
}
