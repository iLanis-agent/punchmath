# Punch Math

Punch press force arithmetic. The punch of 100 mm perimeter through 2 mm of stock at 300 N/mm2 asks for 60000 N by the perimeter-times-thickness-times-strength rule.

## What it computes

- **The force truth** - what a punch asks for (perimeter 0.01 to 10000 mm, thickness 0.01 to 100 mm, shear strength 0.01 to 2000 N/mm2): perimeter times thickness times strength, the named shop estimate.
- **The rectangle truth** - the perimeter of a rectangular punch (two sides) and its force in one go.
- **The weight truth** - the mass a force would weigh under the named 9.81 m/s2 figure (1 to 100000000 N).
- **The stroke truth** - the work of one stroke: force times thickness, the named rough estimate.

## Boundary

Arithmetic only. Named shop estimates, applied as written. A round hole's circumference is the owner's own entry from their own table. It has not seen any press and does not know the tooling, the die clearance, the machine's real tonnage or the stock actually used, and it gives no verdict that the press or the punch survives. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, BigInt cross-products, half-up on display).
- `oracle.py` - the Python mirror (Fractions) that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/punchmath/
Repo: https://github.com/iLanis-agent/punchmath
