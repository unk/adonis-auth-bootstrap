import { download, Destination } from "https://deno.land/x/download/mod.ts";

async function getController( url : string ) {
    const dir = "./app/Controllers/Http/";
    await Deno.mkdir( dir, { recursive: true } );
    const destination : Destination = {
        dir,
        file: url.split( '/' ).pop(),
    }
    await download( url, destination )
}

async function appendRoutes() {
    const dir = "./start/";
    const encoder = new TextEncoder();
    let text = "\n // Auth";
    text += "\nRoute.post( '/auth/sign-up', 'AuthController.signUp' );";
    text += "\nRoute.post( '/auth/sign-in', 'AuthController.signIn' );";
    text += "\nRoute.get( '/me', 'UserController.getProfile' );";
    text += "\nRoute.patch( '/me', 'UserController.updateProfile' );";
    text += "\n";
    const content = encoder.encode( text);
    await Deno.writeFile( dir + "routes.js", content, { append: true } );
}

await getController("https://raw.githubusercontent.com/unk/adonis-auth-bootstrap/main/AuthController.js");
await getController("https://raw.githubusercontent.com/unk/adonis-auth-bootstrap/main/UserController.js");
await appendRoutes();
