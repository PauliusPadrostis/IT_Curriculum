# TODO

## Docx template library (po formatų stabilizacijos)

**Kada:** kai Teacher_Plan formatas nusistovės (~5-7 planų be formatavimo pakeitimų).

**Kas:** Iškelti stabilią docx formatavimo logiką (spalvos, šriftai, fazių antraštės, metaduomenų kortelės, tikslų langeliai, įspėjimų blokai) į atskirą JS biblioteką. LLM generuotų tik turinio duomenų objektą (JSON), o biblioteka deterministiškai paverčia jį .docx.

**Kodėl:**
- Dabartinis būdas: LLM generuoja ~8-20KB docx builder kodo per dokumentą (formatavimas + turinys kartu).
- Su šablonu: LLM generuoja ~2-4KB struktūrizuotų duomenų.
- Sumažinimas: ~60-75% mažiau output tokenų per dokumentą.
- Formato pakeitimai vienoje vietoje, ne per skill references kiekvieną kartą.

**Priklausomybės:** Stabilizuotas plan_format.md, teacher_profile.md, užbaigti bent 5-7 Teacher_Plan be formatavimo iteracijų.
