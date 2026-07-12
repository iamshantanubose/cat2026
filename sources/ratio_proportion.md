# Ratio & Proportion — Question Sourcing Ledger

Internal reference only. Not shown in the UI — sprint page renders questions as "Question 1..10" with no year/paper tag, so the exam feels live rather than a labeled PYQ set.

| id | Source (paper · slot · Q#) | Type | Answer |
|----|------------------------------|------|--------|
| 1  | CAT 2021 Slot 1 · Q49 | MCQ  | 11 : 3 |
| 2  | CAT 2023 Slot 1 · Q52 | MCQ  | 5 : 9 |
| 3  | CAT 2024 Slot 1 · Q55 | MCQ  | 13.26 |
| 4  | CAT 2024 Slot 1 · Q62 | TITA | 66 |
| 5  | CAT 2024 Slot 3 · Q65 | MCQ  | 7 : 9 |
| 6  | CAT 2025 Slot 1 · Q65 | MCQ  | 99 |
| 7  | CAT 2025 Slot 2 · Q63 | MCQ  | 3 : 5 |
| 8  | CAT 2025 Slot 2 · Q68 | MCQ  | 5 : 8 |
| 9  | CAT 2025 Slot 3 · Q54 | MCQ  | 73 |
| 10 | CAT 2025 Slot 3 · Q67 | TITA | 272 |

All answers cross-checked against the official Cracku answer key + worked solution for each paper (see `/tmp/catpdf` extraction, or re-run `pdftotext -layout` on the source PDF and grep the question number in the answer-key section near end of doc).

Source PDFs live in the repo root (`CAT <year> ... Question Paper by Cracku.pdf`), git-ignored — not redistributed via the repo, kept local only.
