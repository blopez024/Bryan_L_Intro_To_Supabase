const supabase = require("./supabase.js");

const { faker } = require("@faker-js/faker");

async function main() {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: "admin@something.com",
        password: "pass123"
    })

    if (error) {
        console.log("There was an error authenticating")
        console.log(error)
        //To Exit the function early
        return;
    }

    const users = [];
    for (let i = 0; i < 5; i++) {
        const user = {
            email: faker.internet.email(),
            name: faker.person.fullName(),
            role: i === 0 ? 'ADMIN' : i === 1 ? 'EDITOR' : 'USER',
        }
        users.push(user);
    }
    console.log(users);

    try {
        const { data } = await supabase.from("persons").insert(users);
        console.log(data);
    } catch (e) {
        console.log(e);
    }
}

main().catch(err => console.log(err));
