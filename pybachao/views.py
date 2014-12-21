from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.core.context_processors import csrf
from datetime import date
from django.utils.timezone import now
from pybachao.models import AreaReport

import json

# Create your views here.

def index(request):
    template = loader.get_template('pybachao/index.html')
    context = RequestContext(request, {
        'something': '0',
    })
    return HttpResponse(template.render(context));


def report(request):
    if request.method == 'POST':
        latitude = request.POST.get('latitude');
        longitude = request.POST.get('longitude');
        threatScore = request.POST.get('threatScore');
        transScore = request.POST.get('transScore');
        infraScore = request.POST.get('infraScore');
        comments = request.POST.get('addComments');
        placeId = request.POST.get('placeId');


        areaReport = AreaReport(latitude=latitude,
                                longitude=longitude,
                                securityScore = threatScore,
                                transScore = transScore,
                                infraScore = infraScore,
                                placeId = placeId,
                                addComments = comments);

        areaReport.save();

        response_data = {}

        response_data['result'] = 'hello';

        return HttpResponse(
                json.dumps(response_data),
                content_type="application/json"
        )

    else:
        return HttpResponse(
            json.dumps({"nothing to see": "this isn't happening"}),
            content_type="application/json"
        )
