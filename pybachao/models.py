from django.db import models

# Create your models here.
class AreaReport(models.Model):
    latitude = models.FloatField();
    longitude = models.FloatField();
    transScore = models.IntegerField();
    infraScore = models.IntegerField();
    securityScore = models.IntegerField();
    addComments = models.CharField(max_length=200,default="NO_COMMENT");
    placeId = models.IntegerField();


class AreaSummary(models.Model):
    placeId = models.IntegerField();
    finalTransScore = models.IntegerField();
    finalInfraScore = models.IntegerField();
    finalSecurityScore = models.IntegerField();
    finalComments = models.TextField();
