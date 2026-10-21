const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { force: forceTruth, rect: rectTruth, mass: massTruth, work: workTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the perimeter must be from 0.01 to 10000 mm with at most two decimal places",
  "the thickness must be from 0.01 to 100 mm with at most two decimal places",
  "the strength must be from 0.01 to 2000 N/mm2 with at most two decimal places",
  "the side must be from 0.01 to 10000 mm with at most two decimal places",
  "the force must be from 1 to 100000000 N with no decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
