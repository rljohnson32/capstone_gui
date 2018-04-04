import json
filepath1 = "./NYSE.txt"
filepath2 = "./NASDAQ.txt"
symbols = []

with open (filepath1) as f:
	lines = f.readlines();
	for line in lines:
		if "Symbol" in line:
			continue
		data = line.split('\t')
		symbol = data[0].strip('\n\r \t')
		name = data[1].strip('\n\r \t')
		#print "Quote: " + quote + "\nBY: " + author
		symbolpair = {}
		symbolpair["symbol"] = symbol
		symbolpair["name"] = name
		symbols.append(symbolpair)
		#print symbolpair

with open (filepath2) as f:
	lines = f.readlines();
	for line in lines:
		if "Symbol" in line:
			continue
		data = line.split('\t')
		symbol = data[0].strip('\n\r \t')
		name = data[1].strip('\n\r \t')
		#print "Quote: " + quote + "\nBY: " + author
		symbolpair = {}
		symbolpair["symbol"] = symbol
		symbolpair["name"] = name
		symbols.append(symbolpair)
		#print symbolpair

jsonobj = json.dumps(symbols)

fh = open("./stockSymbols.JSON","w")
fh.write(jsonobj)
fh.close()