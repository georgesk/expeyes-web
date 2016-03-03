SUBDIRS = po

all:
	for d in $(SUBDIRS); do $(MAKE) -C $$d $@; done

.phony: all

