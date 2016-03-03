SOURCEFILES = $(shell find .. -name "*.html")
POFILES = $(shell ls *.po)

all: $(POFILES)

messages.pot: $(SOURCEFILES) ../utils/makepot Makefile
	cd ..; utils/makepot

%.po: messages.pot
	msgmerge --update $@ messages.pot
