### Running the JSON Server

To start the JSON server and serve your `db.json` file on port 4000, use the following command:

```bash
npm run serve-json
```

Make sure you have `json-server` installed and added to your `package.json` scripts. If it's not already set up, you can add the following script to your `package.json`:

```json
"scripts": {
  "serve-json": "json-server --watch db.json --port 4000"
}
```

### Prerequisites

- Ensure `json-server` is installed. You can install it globally using:

  ```bash
  npm install -g json-server
  ```

- Place your `db.json` file in the root of your project directory.

### Starting the Server

Run the command:

```bash
npm run serve-json
```

This will start the JSON server and watch for changes in `db.json`, serving it at `http://localhost:4000`.

---
