#!/usr/bin/python3

"""
parses a po file and outputs a hash table to translate strings in the
language supported by this po file
"""

import sys, re
from hashlib import md5

idPattern=re.compile(r'^msgid (".*")$')
strPattern=re.compile(r'^msgstr (".*")$')
usualPattern=re.compile(r'^(".*")$')

class HashTable:

    def __init__(self, f):
        """
        the constructor.
        @param f an open file
        """
        self.data={}
        currentId=""
        currentStr=""
        waitingFor="id"
        for l in f.readlines():
            matchStr=strPattern.match(l)
            matchId=idPattern.match(l)
            match=usualPattern.match(l)
            if waitingFor=="id":
                if matchStr:
                    waitingFor="str"
                    currentStr=eval(matchStr.group(1))
                elif match:
                    currentId+=eval(match.group(1))
            elif waitingFor=="str":
                if matchId:
                    # an id and a str were found, record them
                    self.data[currentId]=currentStr
                    waitingFor="id"
                    currentId=eval(matchId.group(1))
                elif match:
                    currentStr+=eval(match.group(1))
        # end of the file; there is still one iem to record
        self.data[currentId]=currentStr
        return

    def __str__(self):
        return str(self.data)

    def toHash(self):
        """
        @return a dictionary of MD5 hashes replacing the msgIds
        """
        result={}
        spaces=re.compile(r"\s")
        for k in self.data:
            kmini=spaces.sub("",k).encode("utf-8")
            result[md5(kmini).hexdigest()]=self.data[k]
        return result
    
if __name__=="__main__":
    pofile=sys.argv[1]
    m = re.match(r"^(.*)\.po$", pofile)
    lang=m.group(1)
    ht=HashTable(open(pofile))
    print(ht.toHash())
