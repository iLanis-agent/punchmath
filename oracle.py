import json, random
from fractions import Fraction

def dec2(n):
    if n < 0: return "-" + dec2(-n)
    w, f = divmod(n, 100)
    s = str(w); fs = str(f).zfill(2).rstrip("0")
    return s + "." + fs if fs else s

def hu(num, den):
    return (2*num + den) // (2*den)

def newtons(p, t, s):
    return hu(p*t*s, 1000000)  # hundredths cubed to whole N

def force(p, t, s):
    f = newtons(p, t, s)
    return (f"The punch of {dec2(p)} mm perimeter through {dec2(t)} mm of stock at {dec2(s)} N/mm2 asks for {f} N "
            f"by the perimeter-times-thickness-times-strength rule.")
def rect(a, b, t, s):
    p = 2*(a+b); f = newtons(p, t, s)
    return (f"The rectangular punch of {dec2(a)} mm by {dec2(b)} mm through {dec2(t)} mm of stock at {dec2(s)} N/mm2 "
            f"runs a {dec2(p)} mm perimeter and asks for {f} N.")
def mass(f):
    kg100 = hu(f*10000, 981)
    return f"The force of {f} N matches the weight of {dec2(kg100)} kg under the 9.81 m/s2 figure."
def work(f, t):
    j = hu(f*t, 100000)
    return f"A stroke of {f} N through {dec2(t)} mm of stock spends {j} J by the force-times-thickness estimate."

random.seed(740)
cases = [
  dict(fn="force", args=["100","2","300"], expect=force(10000,200,30000)),
  dict(fn="rect", args=["50","20","2","300"], expect=rect(5000,2000,200,30000)),
  dict(fn="mass", args=["60000"], expect=mass(60000)),
  dict(fn="work", args=["60000","2"], expect=work(60000,200)),
]
for _ in range(25):
    p = random.randint(1,1000000); t = random.randint(1,10000); s = random.randint(1,200000)
    cases.append(dict(fn="force", args=[dec2(p),dec2(t),dec2(s)], expect=force(p,t,s)))
for _ in range(25):
    a = random.randint(1,1000000); b = random.randint(1,1000000)
    t = random.randint(1,10000); s = random.randint(1,200000)
    cases.append(dict(fn="rect", args=[dec2(a),dec2(b),dec2(t),dec2(s)], expect=rect(a,b,t,s)))
for _ in range(20):
    f = random.randint(1,100000000)
    cases.append(dict(fn="mass", args=[str(f)], expect=mass(f)))
for _ in range(20):
    f = random.randint(1,100000000); t = random.randint(1,10000)
    cases.append(dict(fn="work", args=[str(f),dec2(t)], expect=work(f,t)))
errcases = [
  ["force", ["0","2","300"]], ["force", ["100","0","300"]], ["force", ["100","2","0"]],
  ["force", ["10000.01","2","300"]], ["force", ["100","2","2000.01"]], ["force", ["abc","2","300"]],
  ["rect", ["0","20","2","300"]], ["rect", ["50","10000.01","2","300"]],
  ["mass", ["0"]], ["mass", ["1.5"]],
  ["work", ["60000","0"]], ["work", ["0","2"]],
]
json.dump(dict(cases=cases, errors=errcases), open("expected.json","w"), indent=1)
print(len(cases), "cases,", len(errcases), "errcases")
