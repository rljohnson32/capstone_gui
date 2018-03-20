import json
filepath = "./quotes.txt"
quotes = []

with open (filepath) as f:
	lines = f.readlines();
	for line in lines:
		data = line.split('~')
		quote = data[0].strip('\n\r \t')
		author = data[1].strip('\n\r \t')
		#print "Quote: " + quote + "\nBY: " + author
		quotepair = {}
		quotepair["quote"] = quote
		quotepair["author"] = author
		quotes.append(quotepair)

jsonobj = json.dumps(quotes)

fh = open("./quotes.JSON","w")
fh.write(jsonobj)
fh.close()