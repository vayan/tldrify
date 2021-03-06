#!/usr/bin/env python2

import sys
import unirest
import json
import bottle
from bottle import route, run, request
from goose import Goose

apikey = sys.argv[1]


def get_texteaser(url):
    g = Goose()
    article = g.extract(url=url)
    response = unirest.post("http://x.textteaser.com/api", {}, {"token": apikey, "text": article.cleaned_text, "title":  article.title})
    print response.body
    return json.dumps(response.body['sentences'])


@route('/api', method='POST')
def get_url():
    url = request.POST.get("url")
    print "url is " + url
    return get_texteaser(url)

if __name__ == "__main__":
    bottle.debug(True)
    run(host='192.81.222.194', port=1142)
