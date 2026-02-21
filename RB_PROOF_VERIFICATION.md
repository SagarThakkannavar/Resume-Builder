# /rb/proof — Proof & Submission Verification

## Shipped logic

**Status shows "Shipped" ONLY when all of the following are true:**

1. **All 8 steps completed** — Each step (01–08) has an artifact (e.g. "It Worked" or "Add Screenshot" was used on each step).
2. **All 10 checklist tests confirmed** — All 10 checkboxes under "Checklist Confirmation" are checked on the Proof page.
3. **All 3 proof links provided and valid** — Lovable Project Link, GitHub Repository Link, and Deployed URL are filled with valid `http://` or `https://` URLs.

If any of the above is missing, status remains **"In progress"**.

---

## Proof validation

- **URL validation:** Each of the three links is validated as a valid URL (protocol http or https). Invalid or non-URL text shows an inline error: "Enter a valid URL (e.g. https://...)" after blur.
- **Storage:** Links are stored in localStorage under **`rb_final_submission`** (JSON: `{ lovable, github, deploy }`). Checklist is stored under **`rb_checklist_passed`** (array of 10 booleans).

---

## Verification steps

### 1. Step Completion Overview

- [ ] Go to **/rb/proof**.
- [ ] **Expected:** Section "Step Completion Overview" lists all 8 steps with Done or Pending. Done steps use green styling; Pending use muted styling.

### 2. Artifact collection & URL validation

- [ ] Enter an invalid value in **Lovable Project Link** (e.g. `not-a-url`). Tab out (blur).
- [ ] **Expected:** Inline error appears: "Enter a valid URL (e.g. https://...)". Input can show invalid border.
- [ ] Change to `https://lovable.dev/project/123`.
- [ ] **Expected:** Error disappears.
- [ ] Repeat for **GitHub Repository Link** and **Deployed URL** (invalid then valid). All three must be valid URLs for Shipped.
- [ ] **Expected:** In localStorage, key `rb_final_submission` contains JSON with `lovable`, `github`, `deploy`.

### 3. Checklist lock (10 items)

- [ ] With 8 steps complete and 3 valid links, leave one or more checklist items **unchecked**.
- [ ] **Expected:** Status badge remains "In progress".
- [ ] Check all 10 checklist items.
- [ ] **Expected:** With 8 steps + 3 valid links already done, status badge changes to **"Shipped"**. Message appears: "Project 3 Shipped Successfully."

### 4. Copy Final Submission

- [ ] Click **"Copy Final Submission"**.
- [ ] Paste into a text editor.
- [ ] **Expected:** Text matches this structure (with your links):

```
------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: {link}
GitHub Repository: {link}
Live Deployment: {link}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------
```

- [ ] Button shows "Copied!" briefly.

### 5. Shipped confirmation (no flashy UI)

- [ ] When conditions for Shipped are met, **Expected:** Calm message "Project 3 Shipped Successfully." in a simple styled block (e.g. green background). No confetti or flashy animations. Top-right badge shows "Shipped".

### 6. Status stays In progress when lock not met

- [ ] Clear one checklist checkbox (or one step artifact, or one link). **Expected:** Status reverts to "In progress", and "Project 3 Shipped Successfully." message is hidden (or not shown until all conditions are met again).
