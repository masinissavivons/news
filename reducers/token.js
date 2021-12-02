export default function (token="", action) {
    if (action.type == "saveToken") {
        let newToken = action.token;
        console.log("newToken: ", newToken);
        return newToken;
    } else {
        return token;
    }
}