# AI Resume Builder — Verification Steps

## 1) Persistence after refresh

- **Step 1:** Open the app, go to **Builder** (`/builder`).
- **Step 2:** Fill in some fields: name, summary, add 1 experience, add 2 projects, add 8+ skills, add GitHub or LinkedIn URL.
- **Step 3:** Refresh the page (F5 or Ctrl+R).
- **Expected:** All form fields and the live preview show the same data. No data loss.
- **Check storage:** In DevTools → Application → Local Storage → your origin, key `resumeBuilderData` should contain the JSON of your resume.

---

## 2) Score changes live while editing

- **Step 1:** On Builder, clear the form (or start fresh) so the ATS score is low (e.g. 0–25).
- **Step 2:** Type a summary of 40–120 words. **Expected:** Score increases by 15 (e.g. 0 → 15) as you cross the word count.
- **Step 3:** Add at least 2 projects. **Expected:** Score increases by 10.
- **Step 4:** Add at least 1 experience entry. **Expected:** Score increases by 10.
- **Step 5:** Add 8 or more skills (comma-separated). **Expected:** Score increases by 10.
- **Step 6:** Add a GitHub or LinkedIn URL. **Expected:** Score increases by 10.
- **Step 7:** In an experience or project description, add a number (e.g. "Improved performance by 40%" or "10k users"). **Expected:** Score increases by 15.
- **Step 8:** Add an education entry with all fields (school, degree, field, start, end). **Expected:** Score increases by 10.
- **Total:** Score should cap at 100. Each change updates the meter and the number immediately (no submit button).

---

## 3) Suggestions (3 max)

- With an empty or sparse resume, **Expected:** Up to 3 suggestions under the score, e.g.:
  - "Write a stronger summary (40–120 words)."
  - "Add at least 2 projects."
  - "Add measurable impact (numbers) in bullets."
  - "Add more skills (target 8+)."
- As you fix each item, that suggestion should disappear and the score should go up. Never more than 3 suggestions at a time.

---

## 4) Live preview is real

- **Step 1:** On Builder, confirm the right panel shows "Live preview" and a document-style preview.
- **Step 2:** Change name, summary, add education/experience/projects/skills/links. **Expected:** The preview updates immediately with the same content; section headers are Summary, Education, Experience, Projects, Skills, Links.
- **Step 3:** Remove all entries from a section (e.g. delete all projects). **Expected:** That section disappears from the preview (empty sections are not shown).
- **Step 4:** Add GitHub and LinkedIn URLs. **Expected:** In the preview, the Links section shows clickable GitHub and LinkedIn links.

---

## 5) Routes and design unchanged

- **Routes:** `/`, `/builder`, `/preview`, `/proof` — unchanged.
- **Design:** Premium, calm styling; ATS panel is a simple meter + label "ATS Readiness Score" + list of suggestions. No new routes or layout changes.

---

## ATS Score v1 (deterministic) — Reference

| Criteria | Points |
|----------|--------|
| Summary 40–120 words | +15 |
| At least 2 projects | +10 |
| At least 1 experience | +10 |
| Skills ≥ 8 items | +10 |
| GitHub or LinkedIn link | +10 |
| Any experience/project bullet contains a number (%, X, k, etc.) | +15 |
| Education has at least one entry with all fields complete | +10 |
| **Cap** | **100** |

---

## 6) Template system (Classic / Modern / Minimal)

- **Step 1:** On **Builder** (`/builder`), above the ATS score you should see template tabs: **Classic** | **Modern** | **Minimal**. One is selected (default: Classic).
- **Step 2:** Click **Modern**. **Expected:** The live preview panel changes layout/styling only (e.g. section titles without underline, slightly larger name). Content and ATS score do not change.
- **Step 3:** Click **Minimal**. **Expected:** Preview uses sans-serif and lighter section styling. Still black/white, no flashy colors.
- **Step 4:** Go to **Preview** (`/preview`). **Expected:** Same template tabs at top; same selected template (Modern or Minimal if you switched). Document below matches that template.
- **Step 5:** On Preview, switch to **Classic**, then refresh the page. **Expected:** Template remains Classic (stored in localStorage under `resumeBuilderTemplate`).
- **Confirm:** Template switching does **not** change ATS score or resume content; only visual layout/styling.

---

## 7) Bullet structure guidance (Experience & Projects)

- **Step 1:** On Builder, add one **Experience** entry. In the description field type: `Helped the team with tasks.` (no action verb at start, no numbers).
- **Expected:** Below the textarea, a subtle inline suggestion appears, e.g. "Start with a strong action verb." and "Add measurable impact (numbers)."
- **Step 2:** Change the description to: `Built a dashboard that improved load time by 40%.` **Expected:** Both suggestions disappear (starts with "Built", contains "40%").
- **Step 3:** Add a **Project** with description: `Fixed bugs.` **Expected:** Suggestions appear again (no leading action verb from the list, no numbers).
- **Step 4:** Change to: `Developed API used by 10k users.` **Expected:** Suggestions disappear. You can still type anything; guidance does not block input.

---

## 8) Top 3 Improvements panel

- **Step 1:** On Builder, ensure the resume is sparse: no or few projects, no numbers in bullets, short summary, few skills, no experience.
- **Expected:** Under the ATS score, a section **"Top 3 Improvements"** shows up to 3 items, e.g.:
  - "Add at least 2 projects to strengthen your profile."
  - "Add measurable impact (numbers, %, metrics) in experience or project bullets."
  - "Expand your summary (aim for 40+ words)." or "Add more skills (target 8+...)" or "Add internship or project-based experience..."
- **Step 2:** Add 2 projects, add a number in one bullet, expand summary. **Expected:** As you fix items, the list shortens; when nothing applies, the "Top 3 Improvements" section hides. ATS score logic is unchanged.

---

## 9) Export (Print / PDF and Copy as Text)

### Print / Save as PDF
- **Step 1:** Go to **Preview** (`/preview`). You should see **"Print / Save as PDF"** and **"Copy Resume as Text"** buttons (and template tabs).
- **Step 2:** Click **"Print / Save as PDF"**. **Expected:** Browser print dialog opens. In the print preview, only the resume document is shown (white background, black text); no top navigation, no template tabs, no export buttons. Margins and spacing look clean; no colored accents.
- **Step 3:** Choose "Save as PDF" (or print to PDF from the dialog) and save. **Expected:** The PDF contains only the resume content, with consistent spacing and no cut-off sections. Project/experience blocks do not split across pages (page-break rules applied).

### Copy Resume as Text
- **Step 1:** On Preview, click **"Copy Resume as Text"**. **Expected:** A plain-text version is copied to the clipboard. Paste into Notepad: you see Name, Contact, Summary, Education, Experience, Projects, Skills, Links (with section headers and dashes). Content matches the form; no HTML or extra markup.
- **Step 2:** After copy, the button briefly shows **"Copied!"** then reverts.

### Incomplete-resume warning (no block)
- **Step 1:** Clear name and remove all experience and projects (or leave name empty). Go to Preview.
- **Step 2:** Click **"Print / Save as PDF"** or **"Copy Resume as Text"**. **Expected:** A calm message appears: **"Your resume may look incomplete."** Export still proceeds (print dialog opens or text is copied). Export is never blocked.
- **Step 3:** Add a name and at least one project or experience, then export again. **Expected:** The warning no longer appears (or does not appear on next export).

---

## 10) Layout precision
- **Step 1:** On Builder or Preview, add long unbroken text (e.g. a very long URL or sentence without spaces) in name, summary, or a bullet. **Expected:** Text wraps; no horizontal overflow or overlap with other sections.
- **Step 2:** Add several education/experience/project entries. **Expected:** Consistent vertical spacing between sections and blocks; no overlapping content.
