export default function(source="", action) {
    if (action.type == "selectedSource") {
        let newSource = action.sourceSelected;
        return newSource;
    } else {
        return source;
    }
}