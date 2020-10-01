word = raw_input()

letters = []

for i in word:
  if i not in letters:
    letters.append(i)

if (len(letters) % 2 == 0):
  print 'CHAT WITH HER!'
else:
  print 'IGNORE HIM!'
