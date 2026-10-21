// Punch Math engine: punch press force from perimeter times thickness times shear strength, the rectangular perimeter it comes from, the weight the force matches under the named 9.81 m/s2 figure, and the work per stroke by the force-times-thickness estimate. Exact integers (hundredths), BigInt for the cross-products, half-up on display only. All rules are named shop estimates; the perimeter, thickness and strength are the owner's own entries - a round hole's circumference comes from the owner's own table.
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _P = "the perimeter must be from 0.01 to 10000 mm with at most two decimal places";
var _T = "the thickness must be from 0.01 to 100 mm with at most two decimal places";
var _S = "the strength must be from 0.01 to 2000 N/mm2 with at most two decimal places";
var _A = "the side must be from 0.01 to 10000 mm with at most two decimal places";
var _F = "the force must be from 1 to 100000000 N with no decimal places";
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _huB(n, d) { return Number((2n * n + d) / (2n * d)); }
function _per(t) { return _p(t, _P, 5, 2, 1, 1000000); }
function _thk(t) { return _p(t, _T, 3, 2, 1, 10000); }
function _str(t) { return _p(t, _S, 4, 2, 1, 200000); }
function _side(t) { return _p(t, _A, 5, 2, 1, 1000000); }
function _force(t) {
  t = typeof t === "string" ? t.trim() : "";
  if (!/^[0-9]{1,9}$/.test(t)) throw new Error(_F);
  var v = parseInt(t, 10);
  if (v < 1 || v > 100000000) throw new Error(_F);
  return v;
}
function _newtons(p100, t100, s100) {
  return _huB(BigInt(p100) * BigInt(t100) * BigInt(s100), 1000000n); // N, half-up: hundredths cubed to whole
}

function forceTruth(per, thk, str) {
  var p = _per(per), t = _thk(thk), s = _str(str);
  var f = _newtons(p, t, s);
  return "The punch of " + _dec(p, 2) + " mm perimeter through " + _dec(t, 2) + " mm of stock at " + _dec(s, 2) + " N/mm2 asks for " + f + " N by the perimeter-times-thickness-times-strength rule.";
}
function rectTruth(a, b, thk, str) {
  var x = _side(a), y = _side(b), t = _thk(thk), s = _str(str);
  var p = 2 * (x + y), f = _newtons(p, t, s);
  return "The rectangular punch of " + _dec(x, 2) + " mm by " + _dec(y, 2) + " mm through " + _dec(t, 2) + " mm of stock at " + _dec(s, 2) + " N/mm2 runs a " + _dec(p, 2) + " mm perimeter and asks for " + f + " N.";
}
function massTruth(force) {
  var f = _force(force);
  var kg100 = _huB(BigInt(f) * 10000n, 981n); // kg in hundredths, 9.81 m/s2 named figure
  return "The force of " + f + " N matches the weight of " + _dec(kg100, 2) + " kg under the 9.81 m/s2 figure.";
}
function workTruth(force, thk) {
  var f = _force(force), t = _thk(thk);
  var j = _huB(BigInt(f) * BigInt(t), 100000n); // J, half-up: N times mm / 1000
  return "A stroke of " + f + " N through " + _dec(t, 2) + " mm of stock spends " + j + " J by the force-times-thickness estimate.";
}
