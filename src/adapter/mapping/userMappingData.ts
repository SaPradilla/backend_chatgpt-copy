interface UserData {
    name: string;
    email: string;
    password: string;
    // messages: Array<string>
}

export function userFormatDataToken(userData:UserData):object{
    
    const formatUser = {...userData}

    delete formatUser.password
    delete formatUser.email
    // delete formatUser.messages

    return formatUser

}