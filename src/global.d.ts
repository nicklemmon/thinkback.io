// Importing Parse directly was causing an error at buildtime when migrating from CRA to Vite.
// Rather than avoid using the bundled ES module, we import it directly and then get reference to the types here
declare module 'parse/dist/parse.js' {
  import Parse from 'parse'

  export = Parse
}
