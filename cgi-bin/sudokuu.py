#!/usr/bin/python

import cgi

def geraJogo(dificuldade):
    if ( dificuldade == '0' ):
        print '000000000'
        print '903507108'
        print '800000003'
        print '030201060'
        print '000040000'
        print '060903050'
        print '500000004'
        print '106302809'
        print '000000000'
    elif ( dificuldade == '1' ):
        print '111000000'
        print '903507108'
        print '800000003'
        print '030201060'
        print '000040000'
        print '060903050'
        print '500000004'
        print '106302809'
        print '000000000'
    elif ( dificuldade == '2' ):
        print '222000000'
        print '903507108'
        print '800000003'
        print '030201060'
        print '000040000'
        print '060903050'
        print '500000004'
        print '106302809'
        print '000000000'
    else:
        print 'dificuldade invalida'
    return;

print "Content-type:text/plain"
print

form = cgi.FieldStorage()

if "dificuldade" not in form:
    print "chamada invalida"
else:
    geraJogo(form.getfirst("dificuldade", "").upper())
