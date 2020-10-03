n = int(raw_input())

def minimum_integer(l, r, d):
  if(l != d and l/d >= 1):
    return d
  else:
    return ((r/d) + 1) * d
  
for i in range(n):
  l, r, d = map(int, raw_input().split())
  
  print minimum_integer(l, r, d)
