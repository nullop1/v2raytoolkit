All changes below are released under version 1.0.0  
(no version bump).

---

## UI & animation improvements

- Fixed harsh and abrupt animations
- Improved easing curves for all transitions
- Fixed panel open / close animation glitches
- Fixed layout jumping when switching tools
- Improved top bar animation for language, theme and palette changes

---

## Layout behavior fixes

- Only the active tool panel expands
- Other panels stay collapsed
- Fixed unwanted page reflow while typing inside inputs

---

## Theme & color system

- Removed old color slider completely
- Added multi‑palette system
- All palettes now work correctly in both light and dark modes
- Added global panel opacity control
- Fixed mismatched colors between light and dark cards

---

## Language system

- Fixed incomplete text replacement
- Implemented true language switching (no overlay texts)
- Added new languages:
  - Arabic
  - German
  - Spanish
  - Italian
  - Indonesian

---

## GitHub & Telegram integration

- Added GitHub project button in top bar
- Added live GitHub star counter
- Added star button that redirects to project page
- Added Telegram channel buttons in top bar

---

## Rename engine fixes

- Fixed rename not being applied to actual config name
- Fixed inconsistent auto numbering
- Unified rename behavior across all tools
- Fixed rename after ping test
- Fixed missing country flag inside renamed output

---

## Ping engine fixes

- Improved real TCP latency test stability
- Fixed ping timeout handling
- Fixed incorrect host parsing in some configs
- Added copy button to ping results

---

## JSON converter fixes

- Fixed multiple outbound handling
- Fixed converter crash on mixed inbound / outbound layouts
- Added unified rename and numbering support

---

## NPVT inspector fixes

- Fixed base64 detection
- Fixed base64 + gzip decoding failures
- Added locked / encrypted file detection
- Added clearer visual status for NPVT files

---

## Input / output behavior

- Fixed output not clearing when input is cleared
- Fixed copy button not responding on large outputs
- Added copy confirmation animation

---

## Performance & stability

- Reduced unnecessary DOM re‑rendering
- Improved large text paste performance
- Improved animation performance
- Improved internal state handling for theme and language switches
