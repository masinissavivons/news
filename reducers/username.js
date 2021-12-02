export default function (username=null, action) {
    if (action.type == "saveUsername") {
        let newUsername = action.saveUsername;
        console.log("register: ", newUsername);
        return newUsername;
    } else {
        return username;
    }
}