# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AreaReport',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('transScore', models.IntegerField()),
                ('infraScore', models.IntegerField()),
                ('securityScore', models.IntegerField()),
                ('addComments', models.CharField(default=b'NO_COMMENT', max_length=200)),
                ('placeId', models.IntegerField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='AreaSummary',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('placeId', models.IntegerField()),
                ('finalTransScore', models.IntegerField()),
                ('finalInfraScore', models.IntegerField()),
                ('finalSecurityScore', models.IntegerField()),
                ('finalComments', models.TextField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
