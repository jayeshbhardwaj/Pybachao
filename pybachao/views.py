from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.core.context_processors import csrf
from datetime import date
from django.utils.timezone import now

import json

# Create your views here.

def index(request):
    template = loader.get_template('pybachao/index.html')
    context = RequestContext(request, {
        'something': '0',
    })
    return HttpResponse(template.render(context));
