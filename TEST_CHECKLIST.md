# AI Resume Builder — Test Checklist

Use this checklist to verify all features work correctly.

---

## 1. All form sections save to localStorage

- [ ] Go to **Builder** (`/builder`).
- [ ] Fill in **Personal Info** (name, email, phone, location), **Summary**, add **Education**, **Experience**, **Projects**, **Skills** (all three categories), **Links** (GitHub, LinkedIn).
- [ ] Refresh the page (F5).
- [ ] **Expected:** All fields and sections are still filled. Open DevTools → Application → Local Storage → `resumeBuilderData`; JSON should contain your data.

---

## 2. Live preview updates in real-time

- [ ] On **Builder**, type in the name field or summary.
- [ ] **Expected:** The right-hand preview panel updates immediately as you type (no save button).
- [ ] Add or remove a skill, project, or experience entry.
- [ ] **Expected:** Preview reflects the change right away.

---

## 3. Template switching preserves data

- [ ] On **Builder** or **Preview**, fill in some resume content.
- [ ] Click each template thumbnail: **Classic**, **Modern**, **Minimal**.
- [ ] **Expected:** Only layout and typography change; name, summary, sections, and content stay the same.

---

## 4. Color theme persists after refresh

- [ ] On **Builder** or **Preview**, select a non-default accent (e.g. **Navy** or **Burgundy**).
- [ ] **Expected:** Headings/sidebar use the new color.
- [ ] Refresh the page.
- [ ] **Expected:** Same color is still selected. Check localStorage key `resumeBuilderAccent`.

---

## 5. ATS score calculates correctly

- [ ] On **Builder** or **Preview**, start with an empty or minimal resume. Note the ATS score (e.g. 0).
- [ ] Add **name** → score +10.
- [ ] Add **email** → score +10.
- [ ] Add **summary** (60+ chars) → score +10.
- [ ] Add **one experience** with a bullet (description) → score +15.
- [ ] Add **one education** entry → score +10.
- [ ] Add **5+ skills** (across categories) → score +10.
- [ ] Add **one project** → score +10.
- [ ] Add **phone** → score +5.
- [ ] Add **LinkedIn** URL → score +5.
- [ ] Add **GitHub** URL → score +5.
- [ ] Add an **action verb** to summary (e.g. "Built", "Led") → score +10.
- [ ] **Expected:** Total 100 (or 100 max). Each change matches the rule above.

---

## 6. Score updates live on edit

- [ ] On **Builder**, open the right panel; on **Preview**, scroll to the ATS circular score.
- [ ] Add or remove name, summary, experience, etc.
- [ ] **Expected:** Score (bar on Builder, circle on Preview) updates immediately without refreshing.

---

## 7. Export buttons work (copy / download)

- [ ] Go to **Preview** (`/preview`).
- [ ] Click **"Copy Resume as Text"**. Paste into Notepad.
- [ ] **Expected:** Plain-text resume with Name, Contact, Summary, Education, Experience, Projects, Skills, Links.
- [ ] Click **"Print / Save as PDF"**.
- [ ] **Expected:** Print dialog opens; toast shows "PDF export ready! Check your downloads." Choosing "Save as PDF" saves a PDF with only the resume (no nav/buttons).

---

## 8. Empty states handled gracefully

- [ ] Clear all resume data (or use a fresh incognito window).
- [ ] **Expected:** Preview shows placeholders (e.g. "Your Name"); no errors. ATS score is 0 with suggestions like "Add your name (+10 points)".
- [ ] **Builder:** Empty skill categories, no projects, no experience — forms and preview render without crashing.

---

## 9. Mobile responsive layout works

- [ ] Resize the browser to a narrow width (e.g. 375px) or use DevTools device mode.
- [ ] **Expected:** Builder form and preview stack or scroll; template picker and color circles wrap; no horizontal overflow. Preview page and ATS block remain usable.

---

## 10. No console errors on any page

- [ ] Open DevTools → Console. Clear the console.
- [ ] Visit **/** (Home), **/builder**, **/preview**, **/proof**. Navigate between them. Change template, color, and form fields.
- [ ] **Expected:** No red errors in the console (warnings are acceptable).

---

## ATS score reference (deterministic)

| Rule | Points |
|------|--------|
| Name provided | +10 |
| Email provided | +10 |
| Summary > 50 chars | +10 |
| At least 1 experience with bullets | +15 |
| At least 1 education entry | +10 |
| At least 5 skills | +10 |
| At least 1 project | +10 |
| Phone provided | +5 |
| LinkedIn provided | +5 |
| GitHub provided | +5 |
| Summary contains action verbs | +10 |
| **Max** | **100** |

**Score bands (Preview):**

- **0–40:** Red — "Needs Work"
- **41–70:** Amber — "Getting There"
- **71–100:** Green — "Strong Resume"
