# Run the app

## Option A — Double-click (Windows)

1. Double-click **START_APP.bat**
2. Wait until you see: `Local: http://localhost:3000/`
3. Your browser may open automatically. If not, open: **http://localhost:3000**
4. **Keep the black window open** while you use the app. Closing it stops the server.

---

## Option B — Terminal

1. Open **Command Prompt** or **PowerShell**
2. Go to this folder:
   ```bash
   cd "c:\Users\sthak\Desktop\project3 new"
   ```
   (Or use your actual path if different.)
3. Run:
   ```bash
   npm run dev
   ```
4. In the output you’ll see something like:
   ```text
   Local:   http://localhost:3000/
   ```
   Open that URL in your browser. If it says another port (e.g. 3001), use that.
5. **Leave the terminal open** while you use the app.

---

## If you see "This site can’t be reached" or "Connection refused"

- The server is **not running**. Start it with Option A or B above.
- **Don’t close** the terminal/command window where you ran `npm run dev` or START_APP.bat.
- Try **http://127.0.0.1:3000** if **http://localhost:3000** doesn’t work.
- If your antivirus or firewall asks, allow Node/npm.

---

## Run built version (no dev server needed for daily use)

```bash
npm run build
npm run preview
```

Then open the URL shown (e.g. http://localhost:4173). This serves the built files.
