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

await getController("https://raw.githubusercontent.com/unk/adonis-auth-bootstrap/main/AuthController.js");
await getController("https://raw.githubusercontent.com/unk/adonis-auth-bootstrap/main/UserController.js");
